// 1. Enums matching your GraphQL schema
export enum Quarter {
  Fall = 'Fall',
  Winter = 'Winter',
  Spring = 'Spring',
  Summer = 'Summer',
}

export enum QuestionCategory {
  CORE_RATING = 'CORE_RATING',
  TIME_SURVEY = 'TIME_SURVEY',
  DEMOGRAPHIC = 'DEMOGRAPHIC',
}

// 2. Base Entity Interfaces
export interface Professor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Course {
  id: string;
  department: string;
  courseNumber: string;
  courseName: string;
  // Note: 'sections' array removed since it now lives on CourseOffering
}

export interface Comment {
  id: string;
  text: string;
}

export interface QuestionDistribution {
  id: string;
  optionLabel: string;
  count: number;
}

// 3. Complex Relational Interfaces
export interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  category: QuestionCategory;
  responseCount: number;
  mean: number | null; // null for categorical (TIME_SURVEY, DEMOGRAPHIC)
  distributions: QuestionDistribution[]; // Replaces Record<string, number>
}

export interface CourseOffering {
  id: string;
  year: number;
  quarter: Quarter;
  section: string;
  courseAudience: number;
  courseResponses: number;

  // Note: I included the instructor fields we discussed previously.
  // If you accidentally dropped them from your latest schema,
  // you'll want to add them back to your .gql file!
  instructorAudience: number;
  instructorResponses: number;

  course: Course;
  professor: Professor;
  questions: Question[];

  // Optional because the ListCourseOfferings query omits them for performance,
  // but GetCourseOffering will populate them.
  comments?: Comment[];
}
