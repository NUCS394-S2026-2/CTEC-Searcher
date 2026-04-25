import { useNavigate, useParams } from 'react-router-dom';

import { CourseAtAGlance } from '../components/CourseAtAGlance';
import { OverallScore } from '../components/OverallScore';
import { QuestionDistributionBlock } from '../components/QuestionDistributionBlock';
import { RAGCommentFeature } from '../components/RAGCommentFeature';
import { useCourseOffering } from '../hooks/useCourseOffering';
import { QuestionCategory } from '../types/types';
import {
  getHoursPerWeek,
  getMean,
  getResponseRate,
  sortDistributionsNumerically,
} from '../utilities/offeringHelpers';

const CORE_RATING_LABELS = [
  'Instructor Rating',
  'Course Rating',
  'Amount Learned',
  'Intellectual Challenge',
  'Prior Interest',
];

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
  const instructionMean = getMean(offering, 1);
  const responseRate = getResponseRate(offering);

  const coreQuestions = offering.questions
    .filter((q) => q.category === QuestionCategory.CORE_RATING)
    .sort((a, b) => a.questionNumber - b.questionNumber);

  const timeSurveyQuestion = offering.questions.find(
    (q) => q.category === QuestionCategory.TIME_SURVEY,
  );

  const demographicQuestions = offering.questions
    .filter((q) => q.category === QuestionCategory.DEMOGRAPHIC)
    .sort((a, b) => a.questionNumber - b.questionNumber);

  const coreRatings = coreQuestions.map((q, i) => ({
    label: CORE_RATING_LABELS[i] ?? q.questionText,
    value: q.mean ?? 0,
  }));

  const hoursPerWeek = getHoursPerWeek(offering);

  // Sort CORE_RATING distributions numerically (1–6)
  const sortedCoreDistributions = (questionNumber: number) => {
    const q = offering.questions.find((q) => q.questionNumber === questionNumber);
    if (!q) return [];
    return [...q.distributions].sort(
      (a, b) => parseInt(a.optionLabel) - parseInt(b.optionLabel),
    );
  };

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
                {offering.quarter} {offering.year} &middot; Section {offering.section}
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

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          <span>
            {offering.courseResponses} responses ({responseRate}% response rate)
          </span>
          <span>{offering.courseAudience} students enrolled</span>
        </div>
      </div>

      {/* AI Summary */}
      {offering.aiSummary && (
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 mb-4">
          <h2 className="text-sm font-bold text-purple-800 mb-3 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3l14 9-14 9V3z"
              />
            </svg>
            AI Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{offering.aiSummary}</p>
          <p className="text-xs text-gray-400 mt-3">Generated from student comments</p>
        </div>
      )}

      {/* At a Glance Summary */}
      <CourseAtAGlance coreRatings={coreRatings} hoursPerWeek={hoursPerWeek} />

      {/* Ratings + Hours per Week */}
      {(coreQuestions.length > 0 || timeSurveyQuestion) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <h2 className="text-sm font-bold text-gray-700 mb-5">Ratings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreQuestions.map((q) => (
              <QuestionDistributionBlock
                key={q.id}
                label={q.questionText}
                mean={q.mean ?? 0}
                distributions={sortedCoreDistributions(q.questionNumber)}
              />
            ))}
            {timeSurveyQuestion && (
              <QuestionDistributionBlock
                key={timeSurveyQuestion.id}
                label={timeSurveyQuestion.questionText}
                distributions={timeSurveyQuestion.distributions}
              />
            )}
          </div>
        </div>
      )}

      {/* Demographics */}
      {demographicQuestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <h2 className="text-sm font-bold text-gray-700 mb-5">Demographics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {demographicQuestions.map((q) => (
              <QuestionDistributionBlock
                key={q.id}
                label={q.questionText}
                distributions={sortDistributionsNumerically(q.distributions)}
              />
            ))}
          </div>
        </div>
      )}

      {/* RAG Ask AI */}
      <RAGCommentFeature
        comments={offering.comments || []}
        courseName={offering.course.courseName}
      />

      {/* Comments */}
      {(offering.comments?.length ?? 0) > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4">
            Student Comments ({offering.comments!.length})
          </h2>
          <div className="flex flex-col gap-4">
            {offering.comments!.map((comment) => (
              <blockquote
                key={comment.id}
                className="text-sm text-gray-600 border-l-2 border-purple-200 pl-4 leading-relaxed"
              >
                {comment.text}
              </blockquote>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};
