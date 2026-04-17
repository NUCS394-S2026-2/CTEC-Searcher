import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Course, CourseOffering } from '../types/types';
import { getCourseMean, getHoursPerWeek, getMean } from '../utilities/offeringHelpers';
import type { CourseOffering } from '../types/types';
import { getHoursPerWeek, getMean } from '../utilities/offeringHelpers';
import { OverallScore } from './OverallScore';

interface CourseCardProps {
  course: Course;
  offerings: CourseOffering[];
}

export const CourseCard = ({ course, offerings }: CourseCardProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const instructionMean = getCourseMean(offerings, 2);
  const totalResponses = offerings.reduce((sum, o) => sum + o.courseResponses, 0);
  const totalAudience = offerings.reduce((sum, o) => sum + o.courseAudience, 0);
  const responseRate =
    totalAudience > 0 ? Math.round((totalResponses / totalAudience) * 1000) / 10 : 0;
  const instructionMean = getMean(offering, 1);
  const courseMean = getMean(offering, 2);
  const hoursPerWeek = getHoursPerWeek(offering);
  const professorName = `${offering.professor.firstName} ${offering.professor.lastName}`;

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
            {totalResponses} responses ({responseRate}%)
          </span>
        </div>
      </div>

      {/* Ratings */}
      <div className="px-5 pb-4 grid grid-cols-1 gap-2">
        {RATING_LABELS.map(({ questionNumber, label }) => (
          <RatingBar
            key={questionNumber}
            value={getCourseMean(offerings, questionNumber)}
            label={label}
          />
        ))}
      </div>

      {/* Expand Text */}
      {!expanded && (
        <div className="px-5 pb-4">
          <p className="text-xs text-gray-400 text-center">
            Click to expand and see all offerings
          </p>
        </div>
      )}

      {/* Expandable Offerings List */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Offerings</h3>
          <div className="space-y-3">
            {offerings.map((offering) => (
              <div
                key={offering.id}
                role="button"
                tabIndex={0}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/course/${offering.id}`);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    navigate(`/course/${offering.id}`);
                  }
                }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-purple-700">
                      {offering.quarter} {offering.year} - Section {offering.section}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {offering.professor.firstName} {offering.professor.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {offering.courseResponses} responses • {getHoursPerWeek(offering)}{' '}
                    hrs/wk
                  </p>
                </div>
                <OverallScore value={getMean(offering, 2)} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
