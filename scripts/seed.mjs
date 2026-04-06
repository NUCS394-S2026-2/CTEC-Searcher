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
      'Racket is a weird language to start with, but it actually levels the playing field if you have zero coding experience.',
      'The peer mentors are lifesavers. Definitely go to office hours if you get stuck on the homeworks.',
      'Highly recommend! Even if you aren\'t a CS major, this is a great class to learn basic computational thinking.',
      'Lectures are recorded and super helpful to look back on. Bain is incredibly approachable.',
      'Some of the later homeworks took a bit longer than expected, but grading is very fair and transparent.',
      'Bain brings so much energy to morning lectures. Actually made me want to switch my major to CS.',
      'The transition from Racket to Python at the end of the quarter was a bit rushed, but still manageable.',
      'Great class. Do the readings before lecture, it makes following along much easier.',
      'Take this with Bain if you can! He truly cares about his students and wants everyone to succeed.'
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
      'This is a massive step up in difficulty from 111. Be prepared to spend a lot of time debugging memory leaks.',
      'Sood\'s slides are a godsend. I essentially used them as my only study material for the exams.',
      'Start the projects early! Especially the later ones involving linked lists and pointers. They will take longer than you think.',
      'I loved this class. C++ can be frustrating, but the feeling when your code finally compiles and passes the tests is unmatched.',
      'The TAs were hit or miss for this quarter, but the ones who knew their stuff were incredibly helpful.',
      'Make sure you really understand pointers. If you don\'t, the second half of the quarter will destroy you.',
      'Fair exams that match exactly what is taught in lecture. No trick questions.',
      'Sood is super nice and patient during office hours. Don\'t be afraid to ask for help.',
      'The workload is heavy, easily 10+ hours a week when projects are due, but you come out of it a much better programmer.',
      'Essential class for any CS major. It lays the foundation for everything else you will do.'
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
      'Malloc lab will haunt my dreams, but getting it to work was the proudest moment of my college career.',
      'Dinda is a legend. His lectures are fascinating, even if the material is incredibly dense.',
      'Start Data Lab the literal second it is released. Do not wait.',
      'This class is a rite of passage. It\'s brutal, the workload is insane, but it fundamentally changes how you view code.',
      'The exams are actually pretty fair if you understand the concepts behind the labs.',
      'Read the textbook! CS:APP is genuinely one of the best computer science textbooks ever written.',
      'Bomb lab was surprisingly fun, kind of like a puzzle. The rest of the labs are just grueling.',
      'Dinda\'s office hours are basically a second lecture. He goes incredibly deep into the material.',
      'You will write very little code in this class, but you will stare at the screen for hours figuring out what those 10 lines should be.',
      'If you survive 213, you can survive anything the CS department throws at you.',
      'Do not take this with other heavy project classes. You need a lot of free time to dedicate to the labs.'
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
      'Good content, but organization could be improved. Canvas was a mess.',
      'Trajcevski clearly knows his stuff, but his teaching style is very disorganized and leaps around a lot.',
      'The concepts are super useful for industry (AWS, microservices, etc.), but you basically end up teaching yourself.',
      'Assignments had extremely vague specs. We spent more time on Ed Discussion trying to clarify the rules than coding.',
      'Grading felt pretty arbitrary at times, but he curves generously at the end.',
      'If you want to learn cloud architecture, it\'s worth taking, just be prepared for a frustrating quarter.',
      'Lectures are very dry. A lot of people stopped showing up after week 3.',
      'The final project was cool because you got a lot of freedom, but getting help from TAs was difficult.',
      'Read the documentation for whatever tech stack you choose. It will be more helpful than the slides.',
      'Class needs a major restructure, but the underlying material is essential for modern software engineering.'
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
      'Building an interpreter from scratch is incredibly satisfying. You finally understand what is happening under the hood of a language.',
      'Racket is back, but this time it actually makes sense why we use it. Perfect language for this class.',
      'Findler is insanely smart but also incredibly approachable. He answers Ed questions at lightning speed.',
      'This class is hard. Conceptually very difficult, but the workload is steady and manageable if you don\'t fall behind.',
      'The tests are tough but fair. They really test your deep understanding, not just memorization.',
      'Do the practice problems before exams. They are the best way to prepare.',
      'I hated Racket in 111, but 321 made me love it. Beautifully designed course.',
      'It feels like a true computer science course, not just a software engineering bootcamp. Highly theoretical but very applied.',
      'Take this class before you graduate. It is the defining course of the NU CS curriculum.'
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
      'Fair exams, clear expectations. One of the better math professors I\'ve had at this school.',
      'Multivariable calculus is tough to visualize, but he does a great job drawing out the concepts on the board.',
      'The problem sets can be tedious, but they are exactly what you need to do well on the midterms.',
      'Much better organized than the intro calc sequence (220-1/2).',
      'Go to discussion sections! The TAs go over problems that are very similar to exam questions.',
      'Zaslow is quirky and funny, keeps lectures engaging even at 9 AM.',
      'Standard math class. Do the homework, study the practice exams, and you will get a good grade.',
      'The textbook isn\'t strictly necessary since his notes cover everything, but it\'s good for extra practice.',
      'Some of the vector calculus stuff at the end gets rushed, but overall a very solid class.',
      'Not an easy A, but definitely a fair A if you put in the work.'
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
      'Best econ class I\'ve taken. Great structure, fair grading, and incredibly engaging lectures.',
      'Even if you aren\'t an Econ major, take this class. Besanko is an amazing storyteller.',
      'The workload is very light compared to other classes. Just a few problem sets and reading.',
      'Exams are mostly multiple choice and very straightforward. No trick questions.',
      'He provides incredibly detailed lecture slides. You don\'t really need the textbook.',
      'The class size is huge, but he somehow makes it feel like a small seminar with his energy.',
      'Makes microeconomics actually interesting instead of just dry graphs and formulas.',
      'The TA sections are a bit of a waste of time unless you are really struggling with the math.',
      'I would take any class this man teaches. Truly a masterclass in lecturing.',
      'Easiest distro I\'ve taken, but I also feel like I learned a ton.'
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
      'Stein is a nice guy, but sometimes he gets bogged down in proofs during lecture instead of doing examples.',
      'The homeworks are much harder than the exams. Find a good study group.',
      'Classic stats class. A bit dry, a lot of formulas, but fundamentally necessary for data science or ML.',
      'You really need to keep up with the reading. If you fall behind on the early concepts, the later stuff makes no sense.',
      'Exams are fair but time-crunched. Know your distributions cold.',
      'Lectures aren\'t strictly mandatory if you can teach yourself from the textbook, but they help reinforce concepts.',
      'I found the combinatorial stuff at the beginning harder than the continuous distributions later on.',
      'Standard issue math/stats class. Nothing spectacular, but gets the job done.'
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
      'Pardo is hilarious. His lectures are always entertaining and he explains complex math intuitively.',
      'The homework assignments are great—you build standard ML algorithms from scratch in Python.',
      'Make sure you have a solid grasp of linear algebra before taking this, or you will struggle.',
      'The final project is open-ended, which is great for building a portfolio piece.',
      'Grading is very fair. They care more about your conceptual understanding than perfect code.',
      'There is a lot of math involved, it\'s not just calling scikit-learn functions.',
      'One of the most useful classes for getting a software engineering or data science internship.',
      'Pardo genuinely cares about his students and is very accessible outside of class.',
      'Highly recommend if you have any interest in AI. Great balance of theory and application.'
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
      'It mimics a real-world software engineering environment perfectly. Sprints, standups, client meetings.',
      'We built a streamlined CTEC searcher for our client project and it was the most rewarding thing I\'ve coded here.',
      'You will learn more about modern web dev (React, Firebase, Node) here than in any other class.',
      'Your experience heavily depends on your team. Pick your group wisely.',
      'Hummel acts like a senior engineering manager. He gives great feedback and pushes you to write clean, deployable code.',
      'A lot of hours spent debugging weird integration issues, but that\'s exactly what a real job is like.',
      'This class is practically an internship. Put the project you make on your resume immediately.',
      'No exams, just constant project work. It\'s a grind, but a very fun one.',
      'Hummel expects a lot, but he gives you the tools to succeed. Must-take for aspiring software engineers.'
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