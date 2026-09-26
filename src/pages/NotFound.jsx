import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight, Home } from 'lucide-react';
export const NotFound = () => {
  return <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#FFFFFF]">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E4232C] mx-auto flex items-center justify-center">
          <Eye size={32} />
        </div>

        <div className="space-y-1">
          <span className="text-4xl font-black text-[#14232E] tracking-tight">
            404
          </span>
          <h1 className="text-xl font-bold text-[#14232E]">
            Out of Focus
          </h1>
          <p className="text-xs text-slate-500">
            The page you are looking for doesn’t exist or has moved. Let’s bring your view back into sharp focus.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#14232E] hover:bg-[#E4232C] text-white text-xs font-bold rounded-md transition-colors">
            <Home size={14} />
            <span>Go to Homepage</span>
          </Link>

          <Link to="/shop" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#14232E] text-xs font-bold rounded-md transition-colors">
            <span>Explore Eyewear</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>;
};