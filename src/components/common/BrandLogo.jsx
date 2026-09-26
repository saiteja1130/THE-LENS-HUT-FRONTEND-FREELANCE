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
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-11',
    lg: 'h-11 sm:h-13'
  }[size] || 'h-9 sm:h-11';

  return (
    <Link to="/" className={`inline-flex items-center group select-none shrink-0 ${className}`}>
      <img
        src="/images/Logo.png"
        alt="The Lens Hut Logo"
        className={`${heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-105 ${
          isDark ? 'brightness-0 invert' : ''
        }`}
      />
    </Link>
  );
};