import {
  getCourseOffering,
  type GetCourseOfferingData,
  listCourseOfferings,
  type ListCourseOfferingsData,
} from '@dataconnect/generated';

import type { CourseOffering, Question } from '../types/types';
import { Quarter, QuestionCategory } from '../types/types';
import { dataConnect } from './firebase';

type ListQuestion =
  ListCourseOfferingsData['courseOfferings'][number]['questions'][number];
type DetailQuestion = NonNullable<
  GetCourseOfferingData['courseOffering']
>['questions'][number];

const parseDistributions = (
  distribution: string | undefined,
): { id: string; optionLabel: string; count: number }[] => {
  if (!distribution) return [];
  try {
    const arr = JSON.parse(distribution);
    if (Array.isArray(arr)) {
      return arr.map((d, idx) => ({
        id: d.id ?? String(idx),
        optionLabel: d.optionLabel ?? String(d.optionLabel ?? idx + 1),
        count: typeof d.count === 'number' ? d.count : 0,
      }));
    }
    return [];
  } catch {
    return [];
  }
};

const inferCategory = (q: ListQuestion | DetailQuestion): QuestionCategory => {
  if (typeof q.questionText !== 'string') return QuestionCategory.CORE_RATING;
  const text = q.questionText.toLowerCase();
  // Only treat as CORE_RATING if it matches known rating prompts
  if (
    /overall rating|rate|instruction|course|learned|challenge|stimulating|interest|effectiveness|amount learned|quality|instructor|mean/i.test(
      text,
    )
  ) {
    return QuestionCategory.CORE_RATING;
  }
  if (/hours per week|hrs per week|hours\/week|average number of hours/i.test(text)) {
    return QuestionCategory.TIME_SURVEY;
  }
  if (/gender|race|ethnicity|demographic|school|class|reason|interest/i.test(text)) {
    return QuestionCategory.DEMOGRAPHIC;
  }
  // Default: not a rating
  return QuestionCategory.DEMOGRAPHIC;
};

const mapQuestions = (
  questions: Array<ListQuestion | DetailQuestion>,
  hasId: boolean = true,
): Question[] =>
  questions.map((q, idx) => {
    const questionText = q.questionText ?? '';
    const responseCount = typeof q.responseCount === 'number' ? q.responseCount : 0;
    const mean = typeof q.mean === 'number' ? q.mean : null;
    let distribution: string = '[]';
    if ('distribution' in q) {
      if (typeof q.distribution === 'string') {
        distribution = q.distribution;
      } else if (Array.isArray(q.distribution) || typeof q.distribution === 'object') {
        try {
          distribution = JSON.stringify(q.distribution);
        } catch {
          distribution = '[]';
        }
      }
    }
    const mapped = {
      id: hasId && 'id' in q && q.id ? q.id : String(idx),
      questionNumber: idx + 1,
      questionText,
      category: inferCategory(q),
      responseCount,
      mean,
      distributions: parseDistributions(distribution),
    };
    return mapped;
  });

const mapListOffering = (
  o: ListCourseOfferingsData['courseOfferings'][number],
): CourseOffering => {
  // Debug log for raw API offering
  console.debug('[mapListOffering] raw API offering:', o);
  return {
    id: o.id,
    year: o.year,
    quarter: o.quarter as Quarter, // Cast string to enum
    section: '', // Not present in API
    courseAudience: typeof o.audience === 'number' ? o.audience : 0,
    courseResponses: typeof o.responsesReceived === 'number' ? o.responsesReceived : 0,
    course: {
      id: o.course.id ?? `${o.course.department}|${o.course.courseNumber}`,
      department: o.course.department,
      courseNumber: o.course.courseNumber,
      courseName: o.course.courseName,
    },
    professor: {
      id: o.professor.id ?? `${o.professor.firstName} ${o.professor.lastName}`,
      firstName: o.professor.firstName,
      lastName: o.professor.lastName,
    },
    questions: mapQuestions(o.questions, true),
  };
};

const mapDetailOffering = (
  o: NonNullable<GetCourseOfferingData['courseOffering']>,
): CourseOffering => {
  // Debug log for raw API offering
  console.debug('[mapDetailOffering] raw API offering:', o);
  return {
    id: o.id,
    year: o.year,
    quarter: o.quarter as Quarter,
    section: '', // Not present in API
    courseAudience: typeof o.audience === 'number' ? o.audience : 0,
    courseResponses: typeof o.responsesReceived === 'number' ? o.responsesReceived : 0,
    course: {
      id: `${o.course.department}|${o.course.courseNumber}`,
      department: o.course.department,
      courseNumber: o.course.courseNumber,
      courseName: o.course.courseName,
    },
    professor: {
      id: `${o.professor.firstName} ${o.professor.lastName}`,
      firstName: o.professor.firstName,
      lastName: o.professor.lastName,
    },
    questions: mapQuestions(o.questions, false),
    comments: Array.isArray(o.comments)
      ? o.comments.map((c, idx) =>
          typeof c === 'string'
            ? { id: String(idx), text: c }
            : c && typeof c === 'object' && 'text' in c && typeof c.text === 'string'
              ? { id: c.id ?? String(idx), text: c.text }
              : { id: String(idx), text: String(c) },
        )
      : [],
  };
};

export const fetchCourseOfferings = async (): Promise<CourseOffering[]> => {
  const result = await listCourseOfferings(dataConnect);
  return result.data.courseOfferings.map(mapListOffering);
};

export const fetchCourseOffering = async (id: string): Promise<CourseOffering | null> => {
  const result = await getCourseOffering(dataConnect, { id });
  const offering = result.data.courseOffering;
  return offering ? mapDetailOffering(offering) : null;
};
