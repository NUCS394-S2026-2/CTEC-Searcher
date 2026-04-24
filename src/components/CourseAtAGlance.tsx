import { ratingTextColor } from '../utilities/ratingColors';

interface CoreRating {
  label: string;
  value: number;
}

interface CourseAtAGlanceProps {
  coreRatings: CoreRating[];
  hoursPerWeek: string;
}

export const CourseAtAGlance = ({ coreRatings, hoursPerWeek }: CourseAtAGlanceProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
      <h2 className="text-sm font-bold text-gray-700 mb-4">At a Glance</h2>
      <div className="flex divide-x divide-gray-100">
        {coreRatings.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center flex-1 px-3 py-1 gap-0.5"
          >
            <span
              className={`text-xl font-black tabular-nums ${value > 0 ? ratingTextColor(value) : 'text-gray-300'}`}
            >
              {value > 0 ? value.toFixed(1) : '—'}
            </span>
            <span className="text-[11px] text-gray-400 text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
        <div className="flex flex-col items-center flex-1 px-3 py-1 gap-0.5">
          <span className="text-xl font-black text-purple-500 tabular-nums">
            {hoursPerWeek}
          </span>
          <span className="text-[11px] text-gray-400 text-center leading-tight">
            hrs / week
          </span>
        </div>
      </div>
    </div>
  );
};
