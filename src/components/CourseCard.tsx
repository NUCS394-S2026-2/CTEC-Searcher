import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { CourseOffering } from '../types/course';
import { getHoursPerWeek, getMean, getResponseRate } from '../utilities/offeringHelpers';
import { OverallScore } from './OverallScore';
import { RatingBar } from './RatingBar';

const RATING_LABELS = [
  { questionText: 'Quality of instruction', label: 'Instruction' },
  { questionText: 'Quality of course', label: 'Course' },
  { questionText: 'Amount learned', label: 'Learning' },
  { questionText: 'Intellectual challenge', label: 'Challenge' },
  { questionText: 'Stimulated interest', label: 'Interest' },
] as const;

interface CourseCardProps {
  offering: CourseOffering;
}

export const CourseCard = ({ offering }: CourseCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const instructionMean = getMean(offering, 'Quality of instruction');
  const responseRate = getResponseRate(offering);
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
          <OverallScore value={instructionMean} />
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {offering.responsesReceived} responses ({responseRate}%)
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 8v-4a1 1 0 011-1h2a1 1 0 011 1v4m-6 0h4"
              />
            </svg>
            {offering.course.department}
          </span>
        </div>
      </div>

      {/* Ratings */}
      <div className="px-5 pb-4 grid grid-cols-1 gap-2">
        {RATING_LABELS.map(({ questionText, label }) => (
          <RatingBar
            key={questionText}
            value={getMean(offering, questionText)}
            label={label}
          />
        ))}
      </div>

      {/* Comments toggle */}
      {offering.comments.length > 0 && (
        <div className="border-t border-gray-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>Student Comments ({offering.comments.length})</span>
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {expanded && (
            <div className="px-5 pb-4 flex flex-col gap-3">
              {offering.comments.map((comment, i) => (
                <blockquote
                  key={i}
                  className="text-xs text-gray-600 border-l-2 border-purple-200 pl-3 leading-relaxed"
                >
                  {comment}
                </blockquote>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
