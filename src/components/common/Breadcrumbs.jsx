import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
export const Breadcrumbs = ({
  items
}) => {
  return <nav aria-label="Breadcrumb" className="py-3 text-xs text-slate-500">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="flex items-center">
          <Link to="/" className="flex items-center gap-1 hover:text-[#E4232C] transition-colors">
            <Home size={13} className="shrink-0 text-slate-400" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return <li key={index} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-slate-400 shrink-0" />
              {isLast || !item.href ? <span className="font-semibold text-[#14232E] truncate max-w-[240px]">
                  {item.label}
                </span> : <Link to={item.href} className="hover:text-[#E4232C] transition-colors">
                  {item.label}
                </Link>}
            </li>;
      })}
      </ol>
    </nav>;
};