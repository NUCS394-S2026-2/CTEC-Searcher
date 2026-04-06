import { useEffect, useState } from 'react';

import { fetchCourseOfferings } from '../services/courseService';
import type { CourseOffering } from '../types/course';

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
