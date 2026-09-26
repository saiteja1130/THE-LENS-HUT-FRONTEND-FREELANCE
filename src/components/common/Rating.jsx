import React from 'react';
import { Star } from 'lucide-react';
export const Rating = ({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true
}) => {
  const starSize = size === 'sm' ? 14 : 16;
  return <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5`}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map(star => <Star key={star} size={starSize} className={`${star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-300'}`} />)}
      </div>
      <span className="text-xs font-semibold text-[#14232E] tabular-nums">
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && <span className="text-xs text-slate-500 tabular-nums">
          ({reviewCount})
        </span>}
    </div>;
};