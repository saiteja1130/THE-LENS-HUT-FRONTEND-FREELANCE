import React from 'react';

export const ProductSkeleton = ({ count = 6, layout = 'grid' }) => {
  return (
    <div
      className={
        layout === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6'
          : 'flex flex-col gap-4'
      }
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 space-y-3 animate-pulse shadow-2xs"
        >
          {/* Image skeleton */}
          <div className="w-full aspect-4/3 bg-slate-100 rounded-xl" />

          {/* Info skeletons */}
          <div className="space-y-2 pt-1">
            <div className="h-3 w-16 bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
            <div className="h-3 w-20 bg-slate-100 rounded" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 w-24 bg-slate-100 rounded" />
              <div className="w-8 h-8 rounded-full bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

