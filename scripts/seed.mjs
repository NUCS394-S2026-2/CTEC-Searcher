/**
 * Seed script for production Firebase Data Connect.
 * Run with: node scripts/seed.mjs
 * Requires: gcloud CLI installed and authenticated with sufficient permissions.
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = dirname(fileURLToPath(import.meta.url));

const GRAPHQL_ENDPOINT =
  'https://firebasedataconnect.googleapis.com/v1beta/projects/northwestern-ctec-searcher/locations/us-east4/services/team-yellow-minimal-initial-version/connectors/example:executeMutation';

const GRAPHQL_QUERY_ENDPOINT =
  'https://firebasedataconnect.googleapis.com/v1beta/projects/northwestern-ctec-searcher/locations/us-east4/services/team-yellow-minimal-initial-version/connectors/example:executeQuery';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

const token = execSync('gcloud auth print-access-token').toString().trim();

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

async function mutate(operationName, variables) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ operationName, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`${operationName} failed: ${JSON.stringify(json.errors, null, 2)}`);
  }
  if (!json.data) {
    throw new Error(
      `${operationName} returned no data. Full response:\n${JSON.stringify(json, null, 2)}`,
    );
  }
  return json.data;
}

async function query(operationName, variables) {
  const res = await fetch(GRAPHQL_QUERY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ operationName, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`${operationName} failed: ${JSON.stringify(json.errors, null, 2)}`);
  }
  if (!json.data) {
    throw new Error(
      `${operationName} returned no data. Full response:\n${JSON.stringify(json, null, 2)}`,
    );
  }
  return json.data;
}

// ---------------------------------------------------------------------------
// AI Summary
// ---------------------------------------------------------------------------

const geminiApiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

async function generateAISummary(prompt) {
  if (!genAI) return null;
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

function buildSummaryPrompt({
  courseName,
  department,
  courseNumber,
  firstName,
  lastName,
  quarter,
  year,
  comments,
}) {
  return `You are summarizing student reviews for a Northwestern University course.
Write a 4-5 sentence summary based ONLY on the comments below. Cover:
- What students learn in this course
- SPECIFIC!! major assignments or assessments with DETAILS!! about them (exams, projects, problem sets, etc.)
- Overall workload and teaching style
- What students liked and disliked
- if there is a curve and how it is applied

Course: ${courseName} (${department} ${courseNumber})
Professor: ${firstName} ${lastName} — ${quarter} ${year}

Student comments:
${comments.map((c, i) => `[${i + 1}] ${c}`).join('\n')}`;
}

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

function getCategoryForQuestion(questionNumber) {
  if (questionNumber === 6) return 'TIME_SURVEY';
  if (questionNumber >= 7) return 'DEMOGRAPHIC';
  return 'CORE_RATING';
}

// ---------------------------------------------------------------------------
// Load seed data
// ---------------------------------------------------------------------------

const seedData = JSON.parse(readFileSync(join(__dirname, 'seed_data.json'), 'utf-8'));

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

console.log('Seeding production Data Connect...\n');
console.log(`Total records to upload: ${seedData.length}\n`);

const professorCache = new Map(); // "firstName|lastName" -> UUID
const courseCache = new Map(); // "department|courseNumber" -> UUID

let recordIndex = 0;
for (const record of seedData) {
  recordIndex++;
  const pct = Math.round((recordIndex / seedData.length) * 100);
  process.stdout.write(
    `[${recordIndex}/${seedData.length}] (${pct}%) ${record.professor.first_name} ${record.professor.last_name} — ${record.course.department} ${record.course.course_number} ${record.offering.quarter} ${record.offering.year}... `,
  );
  const {
    professor,
    course,
    offering,
    likert_questions,
    categorical_questions,
    comments,
  } = record;

  // 1. Professor
  const profKey = `${professor.first_name}|${professor.last_name}`;
  if (!professorCache.has(profKey)) {
    const existing = await query('FindProfessor', {
      firstName: professor.first_name,
      lastName: professor.last_name,
    });
    if (existing.professors?.[0]?.id) {
      professorCache.set(profKey, existing.professors[0].id);
    } else {
      const data = await mutate('CreateProfessor', {
        firstName: professor.first_name,
        lastName: professor.last_name,
      });
      professorCache.set(profKey, data.professor_insert.id);
    }
  }
  const professorId = professorCache.get(profKey);

  // 2. Course
  const courseKey = `${course.department}|${course.course_number}`;
  if (!courseCache.has(courseKey)) {
    const existing = await query('FindCourse', {
      department: course.department,
      courseNumber: course.course_number,
    });
    if (existing.courses?.[0]?.id) {
      courseCache.set(courseKey, existing.courses[0].id);
    } else {
      const data = await mutate('CreateCourse', {
        department: course.department,
        courseNumber: course.course_number,
        courseName: course.course_name.replace(/\s+/g, ' ').trim(),
      });
      courseCache.set(courseKey, data.course_insert.id);
    }
  }
  const courseId = courseCache.get(courseKey);

  // 3. Skip if offering already exists
  const section = (course.sections?.[0] ?? '1').toString();
  const existingOffering = await query('FindCourseOffering', {
    courseId,
    professorId,
    year: offering.year,
    quarter: offering.quarter,
  });
  if (existingOffering.courseOfferings?.[0]) {
    console.log('skipped (already exists)');
    continue;
  }

  // 4. Generate AI summary from local comments before inserting
  const aiSummary =
    comments?.length > 0
      ? await generateAISummary(
          buildSummaryPrompt({
            courseName: course.course_name,
            department: course.department,
            courseNumber: course.course_number,
            firstName: professor.first_name,
            lastName: professor.last_name,
            quarter: offering.quarter,
            year: offering.year,
            comments,
          }),
        )
      : null;

  // 5. CourseOffering — insert fresh
  const offeringData = await mutate('CreateCourseOffering', {
    courseId,
    professorId,
    year: offering.year,
    quarter: offering.quarter,
    section,
    courseAudience: offering.audience,
    courseResponses: offering.responses_received,
    aiSummary,
  });
  const offeringId = offeringData.courseOffering_insert.id;

  // 5. Questions + distributions
  const allQuestions = [...(likert_questions ?? []), ...(categorical_questions ?? [])];

  for (const q of allQuestions) {
    const category = getCategoryForQuestion(q.question_number);
    const questionData = await mutate('CreateQuestion', {
      courseOfferingId: offeringId,
      questionNumber: q.question_number,
      questionText: q.question_text,
      category,
      responseCount: q.response_count,
      mean: q.mean ?? null,
    });
    const questionId = questionData.question_insert.id;

    for (const [label, count] of Object.entries(q.distribution ?? {})) {
      await mutate('CreateQuestionDistribution', {
        questionId,
        optionLabel: label,
        count,
      });
    }
  }

  // 6. Comments
  for (const text of comments ?? []) {
    await mutate('CreateComment', {
      courseOfferingId: offeringId,
      text,
    });
  }

  console.log(
    `done (${allQuestions.length} questions, ${(comments ?? []).length} comments)`,
  );
}

console.log('\nDone! Database seeded successfully.');
