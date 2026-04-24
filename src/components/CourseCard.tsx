import { useState } from 'react';

import type { Course, CourseOffering } from '../types/types';
import { getCourseMean } from '../utilities/offeringHelpers';
import { OfferingList } from './OfferingList';
import { OverallScore } from './OverallScore';

interface CourseCardProps {
  course: Course;
  offerings: CourseOffering[];
}

export const CourseCard = ({ course, offerings }: CourseCardProps) => {
  const [expanded, setExpanded] = useState(false);

  // Question 2 corresponds to "Course Rating"
  const courseRatingMean = getCourseMean(offerings, 2);
  const totalResponses = offerings.reduce((sum, o) => sum + o.courseResponses, 0);
  const totalAudience = offerings.reduce((sum, o) => sum + o.courseAudience, 0);
  const responseRate =
    totalAudience > 0 ? Math.round((totalResponses / totalAudience) * 1000) / 10 : 0;

  return (
    <div
      role="button"
      tabIndex={0}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded);
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                {course.courseNumber}
              </span>
              <span className="text-xs text-gray-400">
                {offerings.length} offering{offerings.length !== 1 ? 's' : ''}
              </span>
            </div>
            <h2 className="text-base font-bold text-gray-900 leading-snug">
              {course.courseName}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{course.department}</p>
          </div>
          {/* Overall score in the top right */}
          <OverallScore value={courseRatingMean} />
        </div>

        {/* Meta Stats Row (Responses) */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {totalResponses} responses ({responseRate}%)
          </span>
        </div>
      </div>

      {/* Expand Text */}
      {!expanded && (
        <div className="px-5 pb-4 mt-1">
          <p className="text-xs text-gray-400 text-center bg-gray-50 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Click to expand and see all offerings
          </p>
        </div>
      )}

      {/* Expandable Offerings List */}
      {expanded && <OfferingList offerings={offerings} />}
    </div>
  );
};
