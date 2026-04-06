import { ratingColor, ratingTextColor } from '../utilities/ratingColors';

interface RatingBarProps {
  value: number;
  label: string;
}

export const RatingBar = ({ value, label }: RatingBarProps) => {
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
};
