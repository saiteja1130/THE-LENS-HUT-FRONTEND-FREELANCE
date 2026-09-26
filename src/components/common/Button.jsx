import React from 'react';
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4232C] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer select-none';
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 h-8 gap-1.5',
    md: 'text-sm px-5 py-2.5 h-10 gap-2',
    lg: 'text-base px-7 py-3 h-12 gap-2.5 font-semibold'
  };
  const variantStyles = {
    primary: 'bg-[#E4232C] text-white hover:bg-[#C81921] active:bg-[#B3141B] shadow-sm',
    secondary: 'bg-white text-[#14232E] border border-[#14232E] hover:bg-[#14232E] hover:text-white',
    outline: 'bg-transparent text-[#14232E] border border-slate-300 hover:border-[#14232E] hover:bg-slate-50',
    ghost: 'bg-transparent text-[#2B2F33] hover:bg-[#F5F6F7] hover:text-[#14232E]',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
  };
  return <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} disabled={disabled} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>;
};