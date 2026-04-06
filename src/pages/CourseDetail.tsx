import { useNavigate, useParams } from 'react-router-dom';

import { OverallScore } from '../components/OverallScore';
import { RatingBar } from '../components/RatingBar';
import { useCourseOffering } from '../hooks/useCourseOffering';
import { getHoursPerWeek, getMean, getResponseRate } from '../utilities/offeringHelpers';

const RATING_LABELS = [
  { questionText: 'Quality of instruction', label: 'Instruction Quality' },
  { questionText: 'Quality of course', label: 'Course Quality' },
  { questionText: 'Amount learned', label: 'Amount Learned' },
  { questionText: 'Intellectual challenge', label: 'Intellectual Challenge' },
  { questionText: 'Stimulated interest', label: 'Stimulated Interest' },
] as const;

export const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { offering, loading, error } = useCourseOffering(id ?? '');

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">
        <p className="text-sm font-medium">Loading...</p>
      </main>
    );
  }

  if (error || !offering) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center text-red-400">
        <p className="text-sm font-medium">Course not found</p>
      </main>
    );
  }

  const professorName = `${offering.professor.firstName} ${offering.professor.lastName}`;
  const instructionMean = getMean(offering, 'Quality of instruction');
  const responseRate = getResponseRate(offering);
  const hoursPerWeek = getHoursPerWeek(offering);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to results
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-sm font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                {offering.course.courseNumber}
              </span>
              <span className="text-sm text-gray-400">
                {offering.quarter} {offering.year}
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 leading-snug mb-1">
              {offering.course.courseName}
            </h1>
            <p className="text-base text-gray-500">{professorName}</p>
            <p className="text-sm text-gray-400 mt-0.5">{offering.course.department}</p>
          </div>
          <OverallScore value={instructionMean} />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          <span>
            {offering.responsesReceived} responses ({responseRate}% response rate)
          </span>
          <span>{offering.audience} students enrolled</span>
          <span>{hoursPerWeek} hrs/wk</span>
        </div>
      </div>

      {/* Ratings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 className="text-sm font-bold text-gray-700 mb-4">Ratings</h2>
        <div className="flex flex-col gap-4">
          {RATING_LABELS.map(({ questionText, label }) => (
            <RatingBar
              key={questionText}
              value={getMean(offering, questionText)}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Comments */}
      {offering.comments.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4">
            Student Comments ({offering.comments.length})
          </h2>
          <div className="flex flex-col gap-4">
            {offering.comments.map((comment, i) => (
              <blockquote
                key={i}
                className="text-sm text-gray-600 border-l-2 border-purple-200 pl-4 leading-relaxed"
              >
                {comment}
              </blockquote>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};
