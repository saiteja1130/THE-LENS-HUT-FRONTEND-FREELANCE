import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, Compass, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
export const MobileMenu = ({
  isOpen,
  onClose
}) => {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const {
    wishlistCount
  } = useWishlist();
  const {
    cartCount,
    setIsCartDrawerOpen
  } = useCart();
  const navigate = useNavigate();
  if (!isOpen) return null;
  const handleNav = path => {
    onClose();
    navigate(path);
  };
  return <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#14232E]/60 backdrop-blur-xs transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-[#14232E]">
                  THE LENS <span className="text-[#E4232C]">HUT</span>
                </span>
              </Link>
              <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-[#14232E]" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            {/* User Greeting Bar */}
            <div className="px-5 py-3.5 bg-[#F5F6F7] border-b border-slate-200/60">
              {isAuthenticated && user ? <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Welcome,</div>
                    <div className="text-sm font-bold text-[#14232E]">{user.name}</div>
                  </div>
                  <Link to="/account" onClick={onClose} className="text-xs font-semibold text-[#E4232C] hover:underline">
                    Dashboard
                  </Link>
                </div> : <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-600">Sign in for member perks</div>
                  <div className="flex gap-2">
                    <Link to="/login" onClick={onClose} className="text-xs font-bold text-[#14232E] hover:text-[#E4232C]">
                      Login
                    </Link>
                    <span className="text-slate-300">/</span>
                    <Link to="/signup" onClick={onClose} className="text-xs font-bold text-[#E4232C]">
                      Sign Up
                    </Link>
                  </div>
                </div>}
            </div>

            {/* Navigation Links */}
            <nav className="p-5 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Categories
              </div>

              {[{
              name: 'Eyeglasses (Spectacles)',
              path: '/eyeglasses'
            }, {
              name: 'Sunglasses',
              path: '/sunglasses'
            }, {
              name: 'Contact Lenses & Care',
              path: '/contact-lenses'
            }, {
              name: 'All Eyewear',
              path: '/shop'
            }].map(item => <Link key={item.path} to={item.path} onClick={onClose} className="block py-2 text-sm font-semibold text-[#14232E] hover:text-[#E4232C] transition-colors">
                  {item.name}
                </Link>)}

              <div className="pt-4 mt-2 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Information & Support
              </div>

              <Link to="/account?tab=orders" onClick={onClose} className="flex items-center gap-2.5 py-2 text-sm text-[#14232E] hover:text-[#E4232C]">
                <Compass size={16} className="text-slate-400" />
                <span>My Orders & Status</span>
              </Link>
              <Link to="/about-us" onClick={onClose} className="block py-2 text-sm text-[#14232E] hover:text-[#E4232C]">
                About The Lens Hut
              </Link>
              <Link to="/contact-us" onClick={onClose} className="block py-2 text-sm text-[#14232E] hover:text-[#E4232C]">
                Contact & Support
              </Link>
            </nav>
          </div>

          {/* Bottom actions */}
          <div className="p-5 border-t border-slate-100 space-y-3 bg-slate-50">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleNav('/wishlist')} className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 rounded text-xs font-semibold text-[#14232E]">
                <Heart size={14} className="text-[#E4232C]" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
              <button onClick={() => {
              onClose();
              setIsCartDrawerOpen(true);
            }} className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 rounded text-xs font-semibold text-[#14232E]">
                <ShoppingBag size={14} className="text-[#14232E]" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>

            {isAuthenticated && <button onClick={() => {
            logout();
            onClose();
          }} className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded">
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>}

            <div className="text-center text-[10px] text-slate-400">
              Better Vision, Brighter Tomorrow.
            </div>
          </div>
        </div>
      </div>
    </div>;
};