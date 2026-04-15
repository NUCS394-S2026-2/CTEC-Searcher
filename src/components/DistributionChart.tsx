import type { QuestionDistribution } from '../types/types';

interface DistributionChartProps {
  distributions: QuestionDistribution[];
}

export const DistributionChart = ({ distributions }: DistributionChartProps) => {
  if (distributions.length === 0) return null;

  const total = distributions.reduce((sum, d) => sum + d.count, 0);
  const maxCount = Math.max(...distributions.map((d) => d.count));

  return (
    <div className="flex flex-col gap-1.5 mt-2">
      {distributions.map((d) => {
        const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
        const barWidth = maxCount > 0 ? (d.count / maxCount) * 100 : 0;
        return (
          <div key={d.id} className="flex items-center gap-2 text-xs">
            <span className="w-28 text-right text-gray-400 shrink-0 truncate">
              {d.optionLabel}
            </span>
            <div className="flex-1 h-3.5 bg-gray-100 rounded overflow-hidden">
              <div
                className="h-full bg-purple-400 rounded transition-all"
                style={{ width: `${barWidth}%` }}
              />
            </div>
            <span className="w-8 text-right text-gray-400 shrink-0">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
};
