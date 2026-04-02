export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  professor: string;
  department: string;
  term: string;
  year: number;
  responseCount: number;
  responseRate: number;
  ratings: {
    instructionQuality: number;
    courseQuality: number;
    amountLearned: number;
    intellectualChallenge: number;
    stimulatedInterest: number;
    hoursPerWeek: string;
  };
  topComments: string[];
}

export const courses: Course[] = [
  {
    id: '1',
    courseCode: 'COMP_SCI 111',
    courseName: 'Fund Comp Prog',
    professor: 'Connor Bain',
    department: 'Computer Science',
    term: 'Fall',
    year: 2023,
    responseCount: 183,
    responseRate: 84.3,
    ratings: {
      instructionQuality: 5.44,
      courseQuality: 4.75,
      amountLearned: 4.29,
      intellectualChallenge: 4.15,
      stimulatedInterest: 5.1,
      hoursPerWeek: '4-7',
    },
    topComments: [
      'This is a great intro class to CS with a fantastic professor. Dr. Baine is a really engaging lecturer and gives many good examples.',
      'Quickly became one of my favorite courses in the quarter. Professor Connor Bain is probably the best professor this course could have.',
      'Professor Bain is a really great instructor! He made an extremely organized course with engaging lectures, practice quizzes, and helpful but fun assignments.',
    ],
  },
  {
    id: '2',
    courseCode: 'COMP_SCI 211',
    courseName: 'Fundamentals of Computer Programming II',
    professor: 'Sara Sood',
    department: 'Computer Science',
    term: 'Winter',
    year: 2024,
    responseCount: 142,
    responseRate: 79.1,
    ratings: {
      instructionQuality: 5.21,
      courseQuality: 4.93,
      amountLearned: 5.12,
      intellectualChallenge: 4.88,
      stimulatedInterest: 4.74,
      hoursPerWeek: '8-11',
    },
    topComments: [
      'Professor Sood is very clear and organized. The projects are challenging but extremely rewarding.',
      'Great course for learning C++. The assignments are tough but you learn a lot.',
    ],
  },
  {
    id: '3',
    courseCode: 'COMP_SCI 213',
    courseName: 'Introduction to Computer Systems',
    professor: 'Peter Dinda',
    department: 'Computer Science',
    term: 'Fall',
    year: 2023,
    responseCount: 198,
    responseRate: 88.2,
    ratings: {
      instructionQuality: 5.67,
      courseQuality: 5.21,
      amountLearned: 5.45,
      intellectualChallenge: 5.3,
      stimulatedInterest: 5.52,
      hoursPerWeek: '8-11',
    },
    topComments: [
      'One of the best CS courses at Northwestern. Professor Dinda is world-class and clearly passionate about systems.',
      'Challenging but extremely rewarding. You will learn more about how computers work than you ever expected.',
    ],
  },
  {
    id: '4',
    courseCode: 'COMP_SCI 310',
    courseName: 'Scalable Software Architectures',
    professor: 'Goce Trajcevski',
    department: 'Computer Science',
    term: 'Spring',
    year: 2024,
    responseCount: 67,
    responseRate: 71.3,
    ratings: {
      instructionQuality: 3.82,
      courseQuality: 3.65,
      amountLearned: 4.1,
      intellectualChallenge: 4.42,
      stimulatedInterest: 3.78,
      hoursPerWeek: '4-7',
    },
    topComments: [
      'The material is interesting but the lectures can be hard to follow at times.',
      'Good content, but organization could be improved.',
    ],
  },
  {
    id: '5',
    courseCode: 'COMP_SCI 321',
    courseName: 'Programming Languages',
    professor: 'Robby Findler',
    department: 'Computer Science',
    term: 'Winter',
    year: 2024,
    responseCount: 89,
    responseRate: 82.4,
    ratings: {
      instructionQuality: 5.88,
      courseQuality: 5.42,
      amountLearned: 5.6,
      intellectualChallenge: 5.71,
      stimulatedInterest: 5.63,
      hoursPerWeek: '8-11',
    },
    topComments: [
      'Findler is legendary. This course will completely change how you think about programming.',
      'One of the most intellectually stimulating courses I have taken. Highly recommend to anyone serious about CS.',
    ],
  },
  {
    id: '6',
    courseCode: 'MATH 220',
    courseName: 'Differential Calculus of Multivariable Functions',
    professor: 'Eric Zaslow',
    department: 'Mathematics',
    term: 'Fall',
    year: 2023,
    responseCount: 156,
    responseRate: 76.5,
    ratings: {
      instructionQuality: 4.95,
      courseQuality: 4.52,
      amountLearned: 4.8,
      intellectualChallenge: 4.62,
      stimulatedInterest: 4.88,
      hoursPerWeek: '4-7',
    },
    topComments: [
      'Professor Zaslow makes abstract math feel approachable. Great lecturer.',
      "Fair exams, clear expectations. One of the better math professors I've had.",
    ],
  },
  {
    id: '7',
    courseCode: 'ECON 201',
    courseName: 'Microeconomics',
    professor: 'David Besanko',
    department: 'Economics',
    term: 'Fall',
    year: 2023,
    responseCount: 312,
    responseRate: 91.2,
    ratings: {
      instructionQuality: 5.72,
      courseQuality: 5.3,
      amountLearned: 5.15,
      intellectualChallenge: 4.55,
      stimulatedInterest: 5.48,
      hoursPerWeek: '3 or fewer',
    },
    topComments: [
      'Professor Besanko is a phenomenal teacher. His real-world examples make the material come alive.',
      "Best econ class I've taken. Great structure, fair grading, and incredibly engaging lectures.",
    ],
  },
  {
    id: '8',
    courseCode: 'STATS 210',
    courseName: 'Introduction to Probability',
    professor: 'Alan Stein',
    department: 'Statistics',
    term: 'Spring',
    year: 2024,
    responseCount: 121,
    responseRate: 80.7,
    ratings: {
      instructionQuality: 4.32,
      courseQuality: 4.1,
      amountLearned: 4.55,
      intellectualChallenge: 4.88,
      stimulatedInterest: 4.02,
      hoursPerWeek: '4-7',
    },
    topComments: [
      'Good course content but lectures can be slow. Make sure to do the problem sets.',
      'Probability is challenging but the professor is approachable during office hours.',
    ],
  },
  {
    id: '9',
    courseCode: 'COMP_SCI 349',
    courseName: 'Machine Learning',
    professor: 'Bryan Pardo',
    department: 'Computer Science',
    term: 'Spring',
    year: 2024,
    responseCount: 94,
    responseRate: 85.5,
    ratings: {
      instructionQuality: 5.35,
      courseQuality: 5.18,
      amountLearned: 5.42,
      intellectualChallenge: 5.28,
      stimulatedInterest: 5.51,
      hoursPerWeek: '8-11',
    },
    topComments: [
      'Professor Pardo is enthusiastic and makes ML genuinely exciting. Great course.',
      'Challenging projects but you come out feeling like you actually understand ML.',
    ],
  },
  {
    id: '10',
    courseCode: 'COMP_SCI 394',
    courseName: 'Agile Software Development',
    professor: 'Joe Hummel',
    department: 'Computer Science',
    term: 'Spring',
    year: 2024,
    responseCount: 55,
    responseRate: 87.3,
    ratings: {
      instructionQuality: 5.55,
      courseQuality: 5.4,
      amountLearned: 5.38,
      intellectualChallenge: 4.92,
      stimulatedInterest: 5.47,
      hoursPerWeek: '8-11',
    },
    topComments: [
      'Best practical CS course at Northwestern. You actually build something real with a team.',
      'Hummel is great. The course is a lot of work but incredibly valuable for industry prep.',
    ],
  },
];
