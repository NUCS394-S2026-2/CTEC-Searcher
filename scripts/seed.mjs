/**
 * Seed script for local Data Connect emulator.
 * Run with: node scripts/seed.mjs
 * Requires the emulator to be running: npx firebase emulators:start --only dataconnect
 */

const EMULATOR_URL =
  'http://127.0.0.1:9399/v1beta/projects/northwestern-ctec-searcher/locations/us-east4/services/team-yellow-minimal-initial-version/connectors/example:executeMutation';

async function mutate(operationName, variables) {
  const res = await fetch(EMULATOR_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`${operationName} failed: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const professors = [
  { firstName: 'Connor', lastName: 'Bain' },
  { firstName: 'Sara', lastName: 'Sood' },
  { firstName: 'Peter', lastName: 'Dinda' },
  { firstName: 'Goce', lastName: 'Trajcevski' },
  { firstName: 'Robby', lastName: 'Findler' },
  { firstName: 'Eric', lastName: 'Zaslow' },
  { firstName: 'David', lastName: 'Besanko' },
  { firstName: 'Alan', lastName: 'Stein' },
  { firstName: 'Bryan', lastName: 'Pardo' },
  { firstName: 'Joe', lastName: 'Hummel' },
];

const courses = [
  { department: 'Computer Science', courseNumber: 'COMP_SCI 111', courseName: 'Fund Comp Prog', sections: [] },
  { department: 'Computer Science', courseNumber: 'COMP_SCI 211', courseName: 'Fundamentals of Computer Programming II', sections: [] },
  { department: 'Computer Science', courseNumber: 'COMP_SCI 213', courseName: 'Introduction to Computer Systems', sections: [] },
  { department: 'Computer Science', courseNumber: 'COMP_SCI 310', courseName: 'Scalable Software Architectures', sections: [] },
  { department: 'Computer Science', courseNumber: 'COMP_SCI 321', courseName: 'Programming Languages', sections: [] },
  { department: 'Mathematics', courseNumber: 'MATH 220', courseName: 'Differential Calculus of Multivariable Functions', sections: [] },
  { department: 'Economics', courseNumber: 'ECON 201', courseName: 'Microeconomics', sections: [] },
  { department: 'Statistics', courseNumber: 'STATS 210', courseName: 'Introduction to Probability', sections: [] },
  { department: 'Computer Science', courseNumber: 'COMP_SCI 349', courseName: 'Machine Learning', sections: [] },
  { department: 'Computer Science', courseNumber: 'COMP_SCI 394', courseName: 'Agile Software Development', sections: [] },
];

// Each entry: [professorIndex, courseIndex, year, quarter, audience, responsesReceived, questions, comments]
const offerings = [
  {
    professorIdx: 0, courseIdx: 0, year: 2023, quarter: 'Fall',
    audience: 217, responsesReceived: 183,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 183, mean: 5.44 },
      { questionText: 'Quality of course', responseCount: 183, mean: 4.75 },
      { questionText: 'Amount learned', responseCount: 183, mean: 4.29 },
      { questionText: 'Intellectual challenge', responseCount: 183, mean: 4.15 },
      { questionText: 'Stimulated interest', responseCount: 183, mean: 5.10 },
      { questionText: 'Hours per week', responseCount: 183, distribution: { '4-7': 183 } },
    ],
    comments: [
      'This is a great intro class to CS with a fantastic professor. Dr. Baine is a really engaging lecturer and gives many good examples.',
      'Quickly became one of my favorite courses in the quarter. Professor Connor Bain is probably the best professor this course could have.',
      'Professor Bain is a really great instructor! He made an extremely organized course with engaging lectures, practice quizzes, and helpful but fun assignments.',
    ],
  },
  {
    professorIdx: 1, courseIdx: 1, year: 2024, quarter: 'Winter',
    audience: 180, responsesReceived: 142,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 142, mean: 5.21 },
      { questionText: 'Quality of course', responseCount: 142, mean: 4.93 },
      { questionText: 'Amount learned', responseCount: 142, mean: 5.12 },
      { questionText: 'Intellectual challenge', responseCount: 142, mean: 4.88 },
      { questionText: 'Stimulated interest', responseCount: 142, mean: 4.74 },
      { questionText: 'Hours per week', responseCount: 142, distribution: { '8-11': 142 } },
    ],
    comments: [
      'Professor Sood is very clear and organized. The projects are challenging but extremely rewarding.',
      'Great course for learning C++. The assignments are tough but you learn a lot.',
    ],
  },
  {
    professorIdx: 2, courseIdx: 2, year: 2023, quarter: 'Fall',
    audience: 225, responsesReceived: 198,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 198, mean: 5.67 },
      { questionText: 'Quality of course', responseCount: 198, mean: 5.21 },
      { questionText: 'Amount learned', responseCount: 198, mean: 5.45 },
      { questionText: 'Intellectual challenge', responseCount: 198, mean: 5.30 },
      { questionText: 'Stimulated interest', responseCount: 198, mean: 5.52 },
      { questionText: 'Hours per week', responseCount: 198, distribution: { '8-11': 198 } },
    ],
    comments: [
      'One of the best CS courses at Northwestern. Professor Dinda is world-class and clearly passionate about systems.',
      'Challenging but extremely rewarding. You will learn more about how computers work than you ever expected.',
    ],
  },
  {
    professorIdx: 3, courseIdx: 3, year: 2024, quarter: 'Spring',
    audience: 94, responsesReceived: 67,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 67, mean: 3.82 },
      { questionText: 'Quality of course', responseCount: 67, mean: 3.65 },
      { questionText: 'Amount learned', responseCount: 67, mean: 4.10 },
      { questionText: 'Intellectual challenge', responseCount: 67, mean: 4.42 },
      { questionText: 'Stimulated interest', responseCount: 67, mean: 3.78 },
      { questionText: 'Hours per week', responseCount: 67, distribution: { '4-7': 67 } },
    ],
    comments: [
      'The material is interesting but the lectures can be hard to follow at times.',
      'Good content, but organization could be improved.',
    ],
  },
  {
    professorIdx: 4, courseIdx: 4, year: 2024, quarter: 'Winter',
    audience: 108, responsesReceived: 89,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 89, mean: 5.88 },
      { questionText: 'Quality of course', responseCount: 89, mean: 5.42 },
      { questionText: 'Amount learned', responseCount: 89, mean: 5.60 },
      { questionText: 'Intellectual challenge', responseCount: 89, mean: 5.71 },
      { questionText: 'Stimulated interest', responseCount: 89, mean: 5.63 },
      { questionText: 'Hours per week', responseCount: 89, distribution: { '8-11': 89 } },
    ],
    comments: [
      'Findler is legendary. This course will completely change how you think about programming.',
      'One of the most intellectually stimulating courses I have taken. Highly recommend to anyone serious about CS.',
    ],
  },
  {
    professorIdx: 5, courseIdx: 5, year: 2023, quarter: 'Fall',
    audience: 204, responsesReceived: 156,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 156, mean: 4.95 },
      { questionText: 'Quality of course', responseCount: 156, mean: 4.52 },
      { questionText: 'Amount learned', responseCount: 156, mean: 4.80 },
      { questionText: 'Intellectual challenge', responseCount: 156, mean: 4.62 },
      { questionText: 'Stimulated interest', responseCount: 156, mean: 4.88 },
      { questionText: 'Hours per week', responseCount: 156, distribution: { '4-7': 156 } },
    ],
    comments: [
      'Professor Zaslow makes abstract math feel approachable. Great lecturer.',
      "Fair exams, clear expectations. One of the better math professors I've had.",
    ],
  },
  {
    professorIdx: 6, courseIdx: 6, year: 2023, quarter: 'Fall',
    audience: 342, responsesReceived: 312,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 312, mean: 5.72 },
      { questionText: 'Quality of course', responseCount: 312, mean: 5.30 },
      { questionText: 'Amount learned', responseCount: 312, mean: 5.15 },
      { questionText: 'Intellectual challenge', responseCount: 312, mean: 4.55 },
      { questionText: 'Stimulated interest', responseCount: 312, mean: 5.48 },
      { questionText: 'Hours per week', responseCount: 312, distribution: { '3 or fewer': 312 } },
    ],
    comments: [
      'Professor Besanko is a phenomenal teacher. His real-world examples make the material come alive.',
      "Best econ class I've taken. Great structure, fair grading, and incredibly engaging lectures.",
    ],
  },
  {
    professorIdx: 7, courseIdx: 7, year: 2024, quarter: 'Spring',
    audience: 150, responsesReceived: 121,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 121, mean: 4.32 },
      { questionText: 'Quality of course', responseCount: 121, mean: 4.10 },
      { questionText: 'Amount learned', responseCount: 121, mean: 4.55 },
      { questionText: 'Intellectual challenge', responseCount: 121, mean: 4.88 },
      { questionText: 'Stimulated interest', responseCount: 121, mean: 4.02 },
      { questionText: 'Hours per week', responseCount: 121, distribution: { '4-7': 121 } },
    ],
    comments: [
      'Good course content but lectures can be slow. Make sure to do the problem sets.',
      'Probability is challenging but the professor is approachable during office hours.',
    ],
  },
  {
    professorIdx: 8, courseIdx: 8, year: 2024, quarter: 'Spring',
    audience: 110, responsesReceived: 94,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 94, mean: 5.35 },
      { questionText: 'Quality of course', responseCount: 94, mean: 5.18 },
      { questionText: 'Amount learned', responseCount: 94, mean: 5.42 },
      { questionText: 'Intellectual challenge', responseCount: 94, mean: 5.28 },
      { questionText: 'Stimulated interest', responseCount: 94, mean: 5.51 },
      { questionText: 'Hours per week', responseCount: 94, distribution: { '8-11': 94 } },
    ],
    comments: [
      'Professor Pardo is enthusiastic and makes ML genuinely exciting. Great course.',
      'Challenging projects but you come out feeling like you actually understand ML.',
    ],
  },
  {
    professorIdx: 9, courseIdx: 9, year: 2024, quarter: 'Spring',
    audience: 63, responsesReceived: 55,
    questions: [
      { questionText: 'Quality of instruction', responseCount: 55, mean: 5.55 },
      { questionText: 'Quality of course', responseCount: 55, mean: 5.40 },
      { questionText: 'Amount learned', responseCount: 55, mean: 5.38 },
      { questionText: 'Intellectual challenge', responseCount: 55, mean: 4.92 },
      { questionText: 'Stimulated interest', responseCount: 55, mean: 5.47 },
      { questionText: 'Hours per week', responseCount: 55, distribution: { '8-11': 55 } },
    ],
    comments: [
      'Best practical CS course at Northwestern. You actually build something real with a team.',
      'Hummel is great. The course is a lot of work but incredibly valuable for industry prep.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

console.log('Seeding Data Connect emulator...\n');

// 1. Insert professors
console.log('Inserting professors...');
const professorIds = [];
for (const prof of professors) {
  const data = await mutate('CreateProfessor', prof);
  professorIds.push(data.professor_insert.id);
  console.log(`  ✓ ${prof.firstName} ${prof.lastName}`);
}

// 2. Insert courses
console.log('\nInserting courses...');
const courseIds = [];
for (const course of courses) {
  const data = await mutate('CreateCourse', course);
  courseIds.push(data.course_insert.id);
  console.log(`  ✓ ${course.courseNumber}`);
}

// 3. Insert course offerings + questions
console.log('\nInserting course offerings and questions...');
for (const offering of offerings) {
  const offeringData = await mutate('CreateCourseOffering', {
    year: offering.year,
    quarter: offering.quarter,
    courseId: courseIds[offering.courseIdx],
    professorId: professorIds[offering.professorIdx],
    audience: offering.audience,
    responsesReceived: offering.responsesReceived,
    comments: offering.comments,
  });
  const offeringId = offeringData.courseOffering_insert.id;

  for (const q of offering.questions) {
    await mutate('CreateQuestion', {
      courseOfferingId: offeringId,
      questionText: q.questionText,
      responseCount: q.responseCount,
      distribution: JSON.stringify(q.distribution ?? {}),
      mean: q.mean ?? null,
    });
  }

  const prof = professors[offering.professorIdx];
  const course = courses[offering.courseIdx];
  console.log(`  ✓ ${course.courseNumber} — ${prof.firstName} ${prof.lastName} (${offering.quarter} ${offering.year})`);
}

console.log('\nDone! Database seeded successfully.');
