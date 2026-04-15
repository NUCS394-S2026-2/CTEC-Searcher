import { ratingTextColor } from '../utilities/ratingColors';

interface OverallScoreProps {
  value: number;
  size?: 'sm' | 'md';
}

export const OverallScore = ({ value, size = 'md' }: OverallScoreProps) => (
  <div className="flex flex-col items-center justify-center">
    <span
      className={`font-black ${ratingTextColor(value)} ${size === 'sm' ? 'text-2xl' : 'text-3xl'}`}
    >
      {value.toFixed(2)}
    </span>
    <span
      className={`text-gray-400 font-medium ${size === 'sm' ? 'text-xs' : 'text-xs'}`}
    >
      / 6.00
    </span>
  </div>
);
