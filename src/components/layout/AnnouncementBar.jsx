import React from 'react';
import { Truck, HelpCircle, Phone, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
export const AnnouncementBar = () => {
  return <div className="bg-[#0b1a28] text-white text-[11px] font-medium py-2 px-4 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Free Shipping message */}
        <div className="flex items-center gap-2 text-slate-200">
          <Truck size={14} className="text-white shrink-0" />
          <span className="font-normal text-slate-200">Free Shipping on orders above ₹999</span>
        </div>

        {/* Right: Quick Utility Links */}
        <div className="hidden sm:flex items-center gap-5 text-slate-300 text-xs">
          <Link to="/account?tab=orders" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Compass size={13} className="text-slate-400" />
            <span>Track Order</span>
          </Link>
          <span className="text-slate-600">|</span>
          <Link to="/about-us" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <HelpCircle size={13} className="text-slate-400" />
            <span>Help</span>
          </Link>
          <span className="text-slate-600">|</span>
          <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white transition-colors font-medium text-slate-200">
            <Phone size={13} className="text-slate-400" />
            <span>+91 98765 43210</span>
          </a>
        </div>
      </div>
    </div>;
};