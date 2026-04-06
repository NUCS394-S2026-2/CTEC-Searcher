import type { CourseOffering } from '../hooks/useCourses';

export const getMean = (offering: CourseOffering, questionText: string): number => {
  const q = offering.questions.find((q) => q.questionText === questionText);
  return q?.mean ?? 0;
};

export const getHoursPerWeek = (offering: CourseOffering): string => {
  const q = offering.questions.find((q) => q.questionText === 'Hours per week');
  if (!q) return 'N/A';
  try {
    const dist = JSON.parse(q.distribution) as Record<string, number>;
    return Object.keys(dist)[0] ?? 'N/A';
  } catch {
    return 'N/A';
  }
};

export const getResponseRate = (offering: CourseOffering): number => {
  if (offering.audience === 0) return 0;
  return Math.round((offering.responsesReceived / offering.audience) * 1000) / 10;
};
