import type { CourseOffering } from '../types/course';

export const getMean = (offering: CourseOffering, questionText: string): number => {
  const q = offering.questions.find((q) => q.questionText === questionText);
  return q?.mean ?? 0;
};

export const getHoursPerWeek = (offering: CourseOffering): string => {
  const q = offering.questions.find((q) => q.questionText === 'Hours per week');
  if (!q) return 'N/A';
  const keys = Object.keys(q.distribution);
  return keys[0] ?? 'N/A';
};

export const getResponseRate = (offering: CourseOffering): number => {
  if (offering.audience === 0) return 0;
  return Math.round((offering.responsesReceived / offering.audience) * 1000) / 10;
};
