import type { CourseOffering } from '../types/types';
import { QuestionCategory } from '../types/types';

export const getMean = (offering: CourseOffering, questionNumber: number): number => {
  const q = offering.questions.find((q) => q.questionNumber === questionNumber);
  return q?.mean ?? 0;
};

export const getHoursPerWeek = (offering: CourseOffering): string => {
  const q = offering.questions.find((q) => q.category === QuestionCategory.TIME_SURVEY);
  if (!q || q.distributions.length === 0) return 'N/A';
  const top = q.distributions.reduce((a, b) => (a.count > b.count ? a : b));
  return top.optionLabel;
};

export const getResponseRate = (offering: CourseOffering): number => {
  if (offering.courseAudience === 0) return 0;
  return Math.round((offering.courseResponses / offering.courseAudience) * 1000) / 10;
};

export const getCourseMean = (
  offerings: CourseOffering[],
  questionNumber: number,
): number => {
  const means = offerings.map((o) => getMean(o, questionNumber)).filter((m) => m > 0);
  if (means.length === 0) return 0;
  return means.reduce((a, b) => a + b, 0) / means.length;
};
