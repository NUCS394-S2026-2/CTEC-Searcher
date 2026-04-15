import {
  getCourseOffering,
  type GetCourseOfferingData,
  listCourseOfferings,
  type ListCourseOfferingsData,
} from '@dataconnect/generated';

import type { CourseOffering, Question } from '../types/types';
import { dataConnect } from './firebase';

const mapQuestions = (
  questions: ListCourseOfferingsData['courseOfferings'][number]['questions'],
): Question[] =>
  questions.map((q) => ({
    id: q.id,
    questionNumber: q.questionNumber,
    questionText: q.questionText,
    category: q.category,
    responseCount: q.responseCount,
    mean: q.mean ?? null,
    distributions: q.distributions.map((d) => ({
      id: d.id,
      optionLabel: d.optionLabel,
      count: d.count,
    })),
  }));

const mapListOffering = (
  o: ListCourseOfferingsData['courseOfferings'][number],
): CourseOffering => ({
  id: o.id,
  year: o.year,
  quarter: o.quarter,
  section: o.section,
  courseAudience: o.courseAudience,
  courseResponses: o.courseResponses,
  course: {
    id: o.course.id,
    department: o.course.department,
    courseNumber: o.course.courseNumber,
    courseName: o.course.courseName,
  },
  professor: {
    id: o.professor.id,
    firstName: o.professor.firstName,
    lastName: o.professor.lastName,
  },
  questions: mapQuestions(o.questions),
});

const mapDetailOffering = (
  o: NonNullable<GetCourseOfferingData['courseOffering']>,
): CourseOffering => ({
  id: o.id,
  year: o.year,
  quarter: o.quarter,
  section: o.section,
  courseAudience: o.courseAudience,
  courseResponses: o.courseResponses,
  course: {
    id: '',
    department: o.course.department,
    courseNumber: o.course.courseNumber,
    courseName: o.course.courseName,
  },
  professor: {
    id: '',
    firstName: o.professor.firstName,
    lastName: o.professor.lastName,
  },
  questions: mapQuestions(o.questions),
  comments: o.comments.map((c) => ({ id: c.id, text: c.text })),
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
