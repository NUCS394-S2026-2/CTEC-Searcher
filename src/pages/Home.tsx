import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CourseCard } from '../components/CourseCard';
import { SearchBar } from '../components/SearchBar';
import { useCourses } from '../hooks/useCourses';
import { getMean } from '../utilities/offeringHelpers';

const TERMS = ['All', 'Fall', 'Winter', 'Spring', 'Summer'];
const SORT_OPTIONS = [
  { value: '1', label: 'Instruction Rating' },
  { value: '2', label: 'Course Rating' },
  { value: '3', label: 'Amount Learned' },
  { value: '5', label: 'Interest' },
];

export const Home = () => {
  const { offerings, loading, error } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const department = searchParams.get('dept') ?? 'All';
  const term = searchParams.get('term') ?? 'All';
  const sortBy = searchParams.get('sort') ?? SORT_OPTIONS[0].value;

  const setParam = (key: string, value: string, defaultValue: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === defaultValue) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    });
  };

  const departments = useMemo(
    () => [
      'All',
      ...Array.from(new Set(offerings.map((o) => o.course.department))).sort(),
    ],
    [offerings],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return offerings
      .filter((o) => {
        const professorName =
          `${o.professor.firstName} ${o.professor.lastName}`.toLowerCase();
        const matchesQuery =
          !q ||
          o.course.courseName.toLowerCase().includes(q) ||
          o.course.courseNumber.toLowerCase().includes(q) ||
          professorName.includes(q) ||
          o.course.department.toLowerCase().includes(q);
        const matchesDept = department === 'All' || o.course.department === department;
        const matchesTerm = term === 'All' || o.quarter === term;
        return matchesQuery && matchesDept && matchesTerm;
      })
      .sort((a, b) => getMean(b, Number(sortBy)) - getMean(a, Number(sortBy)));
  }, [offerings, query, department, term, sortBy]);

  return (
    <>
      {/* Search + Filters */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3">
          <SearchBar value={query} onChange={(v) => setParam('q', v, '')} />

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 font-medium">Filter:</span>

            <select
              value={department}
              onChange={(e) => setParam('dept', e.target.value, 'All')}
              className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>

            <select
              value={term}
              onChange={(e) => setParam('term', e.target.value, 'All')}
              className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            >
              {TERMS.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Terms' : t}
                </option>
              ))}
            </select>

            <span className="text-xs text-gray-400 font-medium ml-2">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setParam('sort', e.target.value, SORT_OPTIONS[0].value)}
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
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-sm font-medium">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            <p className="text-sm font-medium">Failed to load courses</p>
            <p className="text-xs mt-1">{error.message}</p>
          </div>
        ) : filtered.length === 0 ? (
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
              {filtered.map((offering) => (
                <CourseCard key={offering.id} offering={offering} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};
