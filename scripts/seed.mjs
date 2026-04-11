/**
 * Seed script for Firebase Data Connect (production).
 * Run with: npm run seed
 *
 * Idempotent: re-running will not create duplicate professors or courses.
 * If a course offering already exists (same professor, course, year, quarter),
 * its questions, distributions, and comments are cleared and replaced.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedData = JSON.parse(readFileSync(join(__dirname, 'seed_data.json'), 'utf-8'));

const API_BASE =
  'https://firebasedataconnect.googleapis.com/v1beta/projects/northwestern-ctec-searcher/locations/us-east4/services/team-yellow-minimal-initial-version/connectors/example';

// Stay under 280 req/min (limit is 300) using a sliding-window rate limiter
const RATE_LIMIT = 280;
const WINDOW_MS = 60_000;
const requestTimestamps = [];

async function throttle() {
  const now = Date.now();
  while (requestTimestamps.length && now - requestTimestamps[0] >= WINDOW_MS) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= RATE_LIMIT) {
    const waitMs = WINDOW_MS - (now - requestTimestamps[0]) + 50;
    process.stdout.write(`  [rate limit] waiting ${(waitMs / 1000).toFixed(1)}s...\r`);
    await new Promise((r) => setTimeout(r, waitMs));
    const after = Date.now();
    while (requestTimestamps.length && after - requestTimestamps[0] >= WINDOW_MS) {
      requestTimestamps.shift();
    }
  }
  requestTimestamps.push(Date.now());
}

async function execute(endpoint, operationName, variables) {
  await throttle();
  const res = await fetch(`${API_BASE}:${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`${operationName} failed: ${JSON.stringify(json.errors)}`);
  }
  if (json.data == null) {
    throw new Error(`${operationName} returned no data. Full response: ${JSON.stringify(json)}`);
  }
  return json.data;
}

const mutate = (op, vars) => execute('executeMutation', op, vars);
const query  = (op, vars) => execute('executeQuery', op, vars);

console.log(`Seeding ${seedData.length} offerings...\n`);

// In-memory caches to avoid redundant DB lookups within a single run
const professorIdCache = new Map(); // "FirstName|LastName" -> id
const courseIdCache = new Map();    // "department|courseNumber" -> id

let inserted = 0;
let replaced = 0;

for (const entry of seedData) {
  const { professor, course, offering, likert_questions, categorical_questions, comments } = entry;

  const profKey = `${professor.first_name}|${professor.last_name}`;
  if (!professorIdCache.has(profKey)) {
    const profData = await query('GetProfessorByName', {
      firstName: professor.first_name,
      lastName: professor.last_name,
    });
    if (profData.professor) {
      professorIdCache.set(profKey, profData.professor.id);
    } else {
      const data = await mutate('CreateProfessor', {
        firstName: professor.first_name,
        lastName: professor.last_name,
      });
      professorIdCache.set(profKey, data.professor_insert.id);
      console.log(`  + Professor: ${professor.first_name} ${professor.last_name}`);
    }
  }
  const professorId = professorIdCache.get(profKey);

  const courseKey = `${course.department}|${course.course_number}`;
  if (!courseIdCache.has(courseKey)) {
    const courseData = await query('GetCourseByNumber', {
      department: course.department,
      courseNumber: course.course_number,
    });
    if (courseData.course) {
      courseIdCache.set(courseKey, courseData.course.id);
    } else {
      const data = await mutate('CreateCourse', {
        department: course.department,
        courseNumber: course.course_number,
        courseName: course.course_name.replace(/\n/g, ' '),
      });
      courseIdCache.set(courseKey, data.course_insert.id);
      console.log(`  + Course: ${course.course_number}`);
    }
  }
  const courseId = courseIdCache.get(courseKey);

  const offeringLookup = await query('GetOfferingByKey', {
    professorId,
    courseId,
    year: offering.year,
    quarter: offering.quarter,
  });

  let offeringId;
  if (offeringLookup.ctecOffering) {
    // Offering exists — clear all child data, then update scalar fields.
    // Delete order matters: distributions before questions (FK constraint).
    offeringId = offeringLookup.ctecOffering.id;
    await mutate('DeleteOfferingDistributions', { offeringId });
    await mutate('DeleteOfferingQuestions', { offeringId });
    await mutate('DeleteOfferingComments', { offeringId });
    await mutate('UpdateCtecOffering', {
      id: offeringId,
      audience: offering.audience,
      responsesReceived: offering.responses_received,
    });
    replaced++;
  } else {
    const data = await mutate('CreateCtecOffering', {
      professorId,
      courseId,
      year: offering.year,
      quarter: offering.quarter,
      audience: offering.audience,
      responsesReceived: offering.responses_received,
    });
    offeringId = data.ctecOffering_insert.id;
    inserted++;
  }

  const allQuestions = [
    ...likert_questions.map((q) => ({
      offeringId,
      questionNumber: q.question_number,
      questionText: q.question_text,
      questionType: 'likert',
      responseCount: q.response_count,
      mean: q.mean,
    })),
    ...categorical_questions.map((q) => ({
      offeringId,
      questionNumber: q.question_number,
      questionText: q.question_text,
      questionType: 'categorical',
      responseCount: q.response_count,
      mean: null,
    })),
  ];

  const combinedSourceQuestions = [...likert_questions, ...categorical_questions];
  for (let i = 0; i < allQuestions.length; i++) {
    const { id: questionId } = (await mutate('CreateQuestion', allQuestions[i])).question_insert;
    for (const [optionLabel, count] of Object.entries(combinedSourceQuestions[i].distribution)) {
      await mutate('CreateQuestionDistribution', { questionId, optionLabel, count });
    }
  }

  for (const text of comments) {
    await mutate('CreateComment', { offeringId, text });
  }

  const action = offeringLookup.ctecOffering ? '~' : '+';
  console.log(`  ${action} [${inserted + replaced}/${seedData.length}] ${course.course_number} — ${professor.first_name} ${professor.last_name} (${offering.quarter} ${offering.year})`);
}

console.log(`\nDone! ${inserted} inserted, ${replaced} replaced. (${professorIdCache.size} professors, ${courseIdCache.size} courses)`);