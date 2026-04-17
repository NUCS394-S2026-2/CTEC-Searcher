import { useNavigate } from 'react-router-dom';

import type { CourseOffering } from '../types/types';
import { getHoursPerWeek, getMean } from '../utilities/offeringHelpers';
import { OverallScore } from './OverallScore';

interface OfferingListProps {
  offerings: CourseOffering[];
}

export const OfferingList = ({ offerings }: OfferingListProps) => {
  const navigate = useNavigate();

  return (
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
