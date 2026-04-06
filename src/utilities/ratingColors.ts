export const ratingColor = (value: number): string => {
  if (value >= 5.5) return 'bg-emerald-500';
  if (value >= 4.5) return 'bg-green-400';
  if (value >= 3.5) return 'bg-yellow-400';
  if (value >= 2.5) return 'bg-orange-400';
  return 'bg-red-400';
};

export const ratingTextColor = (value: number): string => {
  if (value >= 5.5) return 'text-emerald-600';
  if (value >= 4.5) return 'text-green-600';
  if (value >= 3.5) return 'text-yellow-600';
  if (value >= 2.5) return 'text-orange-500';
  return 'text-red-500';
};
