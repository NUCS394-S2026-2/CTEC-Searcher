export interface Professor {
  firstName: string;
  lastName: string;
}

export interface Course {
  department: string;
  courseNumber: string;
  sections: string[];
  courseName: string;
}

export interface Question {
  questionText: string;
  responseCount: number;
  distribution: Record<string, number>;
  mean?: number; // present for Likert questions, absent for categorical
}

export interface CourseOffering {
  id: string;
  year: number;
  quarter: string;
  course: Course;
  professor: Professor;
  audience: number;
  responsesReceived: number;
  questions: Question[];
  comments: string[];
}
