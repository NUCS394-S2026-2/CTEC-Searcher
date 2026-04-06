import { listCourseOfferings } from '@dataconnect/generated';

import { dataConnect } from './firebase';

export const fetchCourseOfferings = async () => {
  const result = await listCourseOfferings(dataConnect);
  return result.data.courseOfferings;
};
