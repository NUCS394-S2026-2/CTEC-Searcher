import { useEffect, useState } from 'react';

import { fetchCourseOffering } from '../services/courseService';
import type { CourseOffering } from '../types/types';

export const useCourseOffering = (id: string) => {
  const [offering, setOffering] = useState<CourseOffering | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCourseOffering(id)
      .then(setOffering)
      .catch((err) =>
        setError(err instanceof Error ? err : new Error('Failed to load course')),
      )
      .finally(() => setLoading(false));
  }, [id]);

  return { offering, loading, error };
};
