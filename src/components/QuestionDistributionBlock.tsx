import type { QuestionDistribution } from '../types/types';
import { ratingTextColor } from '../utilities/ratingColors';
import { DistributionChart } from './DistributionChart';

interface QuestionDistributionBlockProps {
  label: string;
  mean?: number;
  distributions: QuestionDistribution[];
}

export const QuestionDistributionBlock = ({
  label,
  mean,
  distributions,
}: QuestionDistributionBlockProps) => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-xs text-gray-700 font-medium">{label}</p>
        {mean !== undefined && (
          <span className="text-base font-black tabular-nums shrink-0 ml-2">
            <span className={ratingTextColor(mean)}>{mean.toFixed(1)}</span>
            <span className="text-gray-300 font-normal text-xs"> / 6</span>
          </span>
        )}
      </div>
      <DistributionChart distributions={distributions} />
    </div>
  );
};
