import { useNavigate } from 'react-router-dom';

import type { CourseOffering } from '../types/types';
import { getHoursPerWeek, getMean } from '../utilities/offeringHelpers';
import { OverallScore } from './OverallScore';

interface CourseCardProps {
  offering: CourseOffering;
}

export const CourseCard = ({ offering }: CourseCardProps) => {
  const navigate = useNavigate();
  const instructionMean = getMean(offering, 1);
  const courseMean = getMean(offering, 2);
  const hoursPerWeek = getHoursPerWeek(offering);
  const professorName = `${offering.professor.firstName} ${offering.professor.lastName}`;

  return (
    <div
      role="button"
      tabIndex={0}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      onClick={() => navigate(`/course/${offering.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/course/${offering.id}`);
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                {offering.course.courseNumber}
              </span>
              <span className="text-xs text-gray-400">
                {offering.quarter} {offering.year}
              </span>
            </div>
            <h2 className="text-base font-bold text-gray-900 leading-snug">
              {offering.course.courseName}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{professorName}</p>
          </div>
          <OverallScore value={courseMean} />
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {instructionMean.toFixed(2)} Teacher Rating
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {hoursPerWeek} hrs/wk
          </span>
        </div>
      </div>
    </div>
  );
};
