import {
  getCourseOffering,
  type GetCourseOfferingData,
  listCourseOfferings,
  type ListCourseOfferingsData,
} from '@dataconnect/generated';

import type { CourseOffering, Question } from '../types/types';
import { dataConnect } from './firebase';

const parseQuestions = (
  questions: {
    questionText: string;
    responseCount: number;
    distribution: string;
    mean?: number | null;
  }[],
): Question[] =>
  questions.map((q) => ({
    questionText: q.questionText,
    responseCount: q.responseCount,
    distribution: (() => {
      try {
        return JSON.parse(q.distribution) as Record<string, number>;
      } catch {
        return {};
      }
    })(),
    mean: q.mean ?? undefined,
  }));

const mapListOffering = (
  o: ListCourseOfferingsData['courseOfferings'][number],
): CourseOffering => ({
  id: o.id,
  year: o.year,
  quarter: o.quarter,
  audience: o.audience,
  responsesReceived: o.responsesReceived,
  comments: o.comments,
  course: {
    department: o.course.department,
    courseNumber: o.course.courseNumber,
    courseName: o.course.courseName,
    sections: o.course.sections,
  },
  professor: {
    firstName: o.professor.firstName,
    lastName: o.professor.lastName,
  },
  questions: parseQuestions(o.questions),
});

const mapDetailOffering = (
  o: NonNullable<GetCourseOfferingData['courseOffering']>,
): CourseOffering => ({
  id: o.id,
  year: o.year,
  quarter: o.quarter,
  audience: o.audience,
  responsesReceived: o.responsesReceived,
  comments: o.comments,
  course: {
    department: o.course.department,
    courseNumber: o.course.courseNumber,
    courseName: o.course.courseName,
    sections: o.course.sections,
  },
  professor: {
    firstName: o.professor.firstName,
    lastName: o.professor.lastName,
  },
  questions: parseQuestions(o.questions),
});

export const fetchCourseOfferings = async (): Promise<CourseOffering[]> => {
  const result = await listCourseOfferings(dataConnect);
  return result.data.courseOfferings.map(mapListOffering);
};

export const fetchCourseOffering = async (id: string): Promise<CourseOffering | null> => {
  const result = await getCourseOffering(dataConnect, { id });
  const offering = result.data.courseOffering;
  return offering ? mapDetailOffering(offering) : null;
};
