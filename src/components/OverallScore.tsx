import { ratingTextColor } from '../utilities/ratingColors';

interface OverallScoreProps {
  value: number;
}

export const OverallScore = ({ value }: OverallScoreProps) => (
  <div className="flex flex-col items-center justify-center">
    <span className={`text-3xl font-black ${ratingTextColor(value)}`}>
      {value.toFixed(2)}
    </span>
    <span className="text-xs text-gray-400 font-medium">/ 6.00</span>
  </div>
);
