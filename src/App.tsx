import './App.css';

import React, { useMemo, useState } from 'react';

import { type Course, courses } from './data/courses';

const RATING_LABELS = [
  { key: 'instructionQuality', label: 'Instruction' },
  { key: 'courseQuality', label: 'Course' },
  { key: 'amountLearned', label: 'Learning' },
  { key: 'intellectualChallenge', label: 'Challenge' },
  { key: 'stimulatedInterest', label: 'Interest' },
] as const;

const DEPARTMENTS = [
  'All',
  ...Array.from(new Set(courses.map((c) => c.department))).sort(),
];
const TERMS = ['All', 'Fall', 'Winter', 'Spring', 'Summer'];
const SORT_OPTIONS = [
  { value: 'instructionQuality', label: 'Instruction Rating' },
  { value: 'courseQuality', label: 'Course Rating' },
  { value: 'amountLearned', label: 'Amount Learned' },
  { value: 'stimulatedInterest', label: 'Interest' },
];

function ratingColor(value: number): string {
  if (value >= 5.5) return 'bg-emerald-500';
  if (value >= 4.5) return 'bg-green-400';
  if (value >= 3.5) return 'bg-yellow-400';
  if (value >= 2.5) return 'bg-orange-400';
  return 'bg-red-400';
}

function ratingTextColor(value: number): string {
  if (value >= 5.5) return 'text-emerald-600';
  if (value >= 4.5) return 'text-green-600';
  if (value >= 3.5) return 'text-yellow-600';
  if (value >= 2.5) return 'text-orange-500';
  return 'text-red-500';
}

function RatingBar({ value, label }: { value: number; label: string }) {
  const pct = ((value - 1) / 5) * 100;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 font-medium truncate">{label}</span>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${ratingColor(value)}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={`text-xs font-bold w-6 text-right ${ratingTextColor(value)}`}>
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

function OverallScore({ value }: { value: number }) {
  const color = ratingTextColor(value);
  return (
    <div className="flex flex-col items-center justify-center">
      <span className={`text-3xl font-black ${color}`}>{value.toFixed(2)}</span>
      <span className="text-xs text-gray-400 font-medium">/ 6.00</span>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                {course.courseCode}
              </span>
              <span className="text-xs text-gray-400">
                {course.term} {course.year}
              </span>
            </div>
            <h2 className="text-base font-bold text-gray-900 leading-snug">
              {course.courseName}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{course.professor}</p>
          </div>
          <OverallScore value={course.ratings.instructionQuality} />
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
            {course.responseCount} responses ({course.responseRate}%)
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
            {course.ratings.hoursPerWeek} hrs/wk
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
            {course.department}
          </span>
        </div>
      </div>

      {/* Ratings */}
      <div className="px-5 pb-4 grid grid-cols-1 gap-2">
        {RATING_LABELS.map(({ key, label }) => (
          <RatingBar key={key} value={course.ratings[key]} label={label} />
        ))}
      </div>

      {/* Comments toggle */}
      {course.topComments.length > 0 && (
        <div className="border-t border-gray-50">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>Student Comments ({course.topComments.length})</span>
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
              {course.topComments.map((comment, i) => (
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
}

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search courses, professors, or departments..."
        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All');
  const [term, setTerm] = useState('All');
  const [sortBy, setSortBy] = useState<
    'instructionQuality' | 'courseQuality' | 'amountLearned' | 'stimulatedInterest'
  >('instructionQuality');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return courses
      .filter((c) => {
        const matchesQuery =
          !q ||
          c.courseName.toLowerCase().includes(q) ||
          c.courseCode.toLowerCase().includes(q) ||
          c.professor.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q);
        const matchesDept = department === 'All' || c.department === department;
        const matchesTerm = term === 'All' || c.term === term;
        return matchesQuery && matchesDept && matchesTerm;
      })
      .sort((a, b) => b.ratings[sortBy] - a.ratings[sortBy]);
  }, [query, department, term, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">NU</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-900 leading-none">
                CTEC Search
              </h1>
              <p className="text-xs text-gray-400 leading-none mt-0.5">
                Northwestern Course Evaluations
              </p>
            </div>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            {courses.length} courses indexed
          </span>
        </div>
      </header>

      {/* Search + Filters */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3">
          <SearchBar value={query} onChange={setQuery} />

          {/* Filters row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 font-medium">Filter:</span>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d}>{d === 'All' ? 'All Departments' : d}</option>
              ))}
            </select>

            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            >
              {TERMS.map((t) => (
                <option key={t}>{t === 'All' ? 'All Terms' : t}</option>
              ))}
            </select>

            <span className="text-xs text-gray-400 font-medium ml-2">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium">No courses found</p>
            <p className="text-xs mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-4 font-medium">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              {query && ` for "${query}"`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-300">
        CTEC data is for Northwestern students only · Not affiliated with Northwestern
        University
      </footer>
    </div>
  );
}
