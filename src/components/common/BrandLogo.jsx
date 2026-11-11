import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({
  theme = 'light',
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isDark = theme === 'dark';

  const heightClass = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-9',
    lg: 'h-9 sm:h-10'
  }[size] || 'h-8 sm:h-9';

  return (
    <Link to="/" className={`inline-flex items-center group select-none shrink-0 ${className}`}>
      {isDark ? (
        <div className="inline-flex items-center justify-center bg-white px-2.5 py-1 rounded-xl shadow-xs border border-white/20 transition-transform duration-200 group-hover:scale-105">
          <img
            src="/images/Logo.png"
            alt="The Lens Hut Logo"
            className={`${heightClass} w-auto object-contain`}
          />
        </div>
      ) : (
        <img
          src="/images/Logo.png"
          alt="The Lens Hut Logo"
          className={`${heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
        />
      )}
    </Link>
  );
};