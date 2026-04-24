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
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        {mean !== undefined && (
          <span className="text-xs font-bold tabular-nums shrink-0 ml-2">
            <span className={ratingTextColor(mean)}>{mean.toFixed(1)}</span>
            <span className="text-gray-300 font-normal"> / 6</span>
          </span>
        )}
      </div>
      <DistributionChart distributions={distributions} />
    </div>
  );
};
