import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
export const Footer = () => {
  return <footer className="bg-[#0b1622] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo theme="dark" size="lg" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-3">
              Premium optical frames, high-definition polarized sunglasses, and specialized breathable contact lenses crafted for style, clarity, and comfort.
            </p>
          </div>

          {/* Column 2: Quick Links (2 sub-columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
                </li>
                <li>
                  <Link to="/sunglasses" className="hover:text-white transition-colors">Sunglasses</Link>
                </li>
                <li>
                  <Link to="/contact-lenses" className="hover:text-white transition-colors">Contact Lenses</Link>
                </li>
                <li>
                  <Link to="/accessories" className="hover:text-white transition-colors">Accessories</Link>
                </li>
              </ul>

              <ul className="space-y-2.5">
                <li>
                  <Link to="/about-us" className="hover:text-white transition-colors">About</Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
                </li>
                <li>
                  <Link to="/checkout" className="hover:text-white transition-colors">Checkout</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-white transition-colors">Return Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay Connected
            </h4>

            {/* Social Icons row */}
            <div className="flex items-center gap-2 pt-1">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#E4232C] text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#E4232C] text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#E4232C] text-white flex items-center justify-center transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#E4232C] text-white flex items-center justify-center transition-colors" aria-label="Pinterest">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.08-.7-.16-1.78.03-2.55l1.18-5.01s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.28.64 1.28 1.42 0 .86-.55 2.16-.84 3.35-.24 1 .5 1.82 1.48 1.82 1.78 0 3.15-1.88 3.15-4.59 0-2.4-1.72-4.08-4.18-4.08-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.78.74 2.29.08.1.1.19.07.31l-.28 1.13c-.04.18-.15.22-.34.13-1.28-.59-2.08-2.46-2.08-3.96 0-3.23 2.35-6.19 6.77-6.19 3.55 0 6.31 2.53 6.31 5.92 0 3.53-2.23 6.38-5.32 6.38-1.04 0-2.02-.54-2.35-1.18l-.64 2.45c-.23.9-.86 2.02-1.28 2.72A12 12 0 1 0 12 0z" />
                </svg>
              </a>
            </div>

            {/* Direct contact lines */}
            <div className="space-y-2 pt-2 text-slate-300">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={13} className="text-slate-400" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:support@thelenshut.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={13} className="text-slate-400" />
                <span>support@thelenshut.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright and payment badges bar */}
        <div className="pt-8 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2025 The Lens Hut. All rights reserved.
          </div>

          {/* Authentic Payment Badges matching the image */}
          <div className="flex items-center gap-2">
            {/* VISA */}
            <span className="px-2.5 py-1 bg-white text-[#1434CB] font-extrabold text-[11px] rounded tracking-wider italic shadow-xs">
              VISA
            </span>

            {/* Mastercard */}
            <span className="px-2.5 py-1 bg-white rounded flex items-center gap-0.5 shadow-xs">
              <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] inline-block -ml-2 mix-blend-multiply" />
            </span>

            {/* Razorpay */}
            <span className="px-2 py-1 bg-white text-[#0C2340] font-bold text-[10px] rounded flex items-center gap-1 shadow-xs">
              <span className="w-2 h-2 rounded-xs bg-[#0C2340] rotate-45" />
              <span>Razorpay</span>
            </span>

            {/* UPI */}
            <span className="px-2.5 py-1 bg-white rounded flex items-center gap-1 shadow-xs">
              <span className="text-[10px] font-extrabold tracking-tight text-[#0F753A]">
                UPI
              </span>
              <span className="w-1.5 h-3 bg-[#E8732A] skew-x-12 inline-block rounded-xs" />
            </span>
          </div>
        </div>
      </div>
    </footer>;
};