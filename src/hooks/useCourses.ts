import type { ListCourseOfferingsData } from '@dataconnect/generated';
import { useEffect, useState } from 'react';

import { fetchCourseOfferings } from '../services/courseService';

export type CourseOffering = ListCourseOfferingsData['courseOfferings'][number];

export const useCourses = () => {
  const [offerings, setOfferings] = useState<CourseOffering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCourseOfferings()
      .then(setOfferings)
      .catch((err) =>
        setError(err instanceof Error ? err : new Error('Failed to load courses')),
      )
      .finally(() => setLoading(false));
  }, []);

  return { offerings, loading, error };
};
