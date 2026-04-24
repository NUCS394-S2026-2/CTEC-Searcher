import { useNavigate } from 'react-router-dom';

// Added Quarter to the import
import { type CourseOffering, Quarter } from '../types/types';
import { getHoursPerWeek, getMean } from '../utilities/offeringHelpers';
import { OverallScore } from './OverallScore';

interface OfferingListProps {
  offerings: CourseOffering[];
}

// Map quarters to numerical values for chronological sorting within the same calendar year
const QUARTER_WEIGHTS: Record<Quarter, number> = {
  [Quarter.Winter]: 1,
  [Quarter.Spring]: 2,
  [Quarter.Summer]: 3,
  [Quarter.Fall]: 4,
};

export const OfferingList = ({ offerings }: OfferingListProps) => {
  const navigate = useNavigate();

  // Create a sorted copy of the offerings array
  const sortedOfferings = [...offerings].sort((a, b) => {
    // Primary sort: Year (descending)
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    // Secondary sort: Quarter (descending chronological order)
    return QUARTER_WEIGHTS[b.quarter] - QUARTER_WEIGHTS[a.quarter];
  });

  return (
    <div className="border-t border-gray-100 px-5 py-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Offerings</h3>
      <div className="space-y-3">
        {/* Map over sortedOfferings instead of offerings */}
        {sortedOfferings.map((offering) => (
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
                {offering.courseResponses} responses • {getHoursPerWeek(offering)} hrs/wk
              </p>
            </div>
            <OverallScore value={getMean(offering, 2)} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
};
