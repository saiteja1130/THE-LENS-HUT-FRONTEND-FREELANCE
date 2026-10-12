import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, ChevronDown, LogOut, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { productApi } from '../../services/productApi';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileMenu } from './MobileMenu';
import { BrandLogo } from '../common/BrandLogo';
export const Header = () => {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const {
    cartCount,
    setIsCartDrawerOpen
  } = useCart();
  const {
    wishlistCount
  } = useWishlist();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const accountMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // Search logic
  useEffect(() => {
    let isMounted = true;
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      productApi.getProducts({ search: q }).then((res) => {
        if (isMounted && res.success && Array.isArray(res.data)) {
          setSearchResults(res.data.slice(0, 5));
        }
      });
    } else {
      setSearchResults([]);
    }
    return () => {
      isMounted = false;
    };
  }, [searchQuery]);
  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  const navLinks = [{
    label: 'Home',
    path: '/'
  }, {
    label: 'Eyeglasses',
    path: '/eyeglasses'
  }, {
    label: 'Sunglasses',
    path: '/sunglasses'
  }, {
    label: 'Contact Lenses',
    path: '/contact-lenses'
  }, {
    label: 'Accessories',
    path: '/accessories'
  }, {
    label: 'Shop',
    path: '/shop'
  }, {
    label: 'About Us',
    path: '/about-us'
  }];
  return <>
      <AnnouncementBar />

      <header className={`sticky top-0 z-40 bg-white transition-all duration-200 border-b border-slate-100 ${isScrolled ? 'shadow-md py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark (Single text element with optical identity) */}
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1.5 text-slate-700 hover:text-[#14232E] focus:outline-none" aria-label="Open navigation menu">
              <Menu size={22} />
            </button>

            <BrandLogo />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 relative">
            <NavLink to="/" className={({
            isActive
          }) => `text-sm font-medium py-2 hover:text-[#E4232C] transition-colors relative ${isActive ? 'text-[#E4232C]' : 'text-slate-700'}`}>
              {({
              isActive
            }) => <>
                  <span>Home</span>
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E4232C] rounded-full" />}
                </>}
            </NavLink>

            {/* Shop with Dropdown */}
            <div className="relative py-2" onMouseEnter={() => setActiveMegaMenu('spectacle')} onMouseLeave={() => setActiveMegaMenu(null)}>
              <NavLink to="/shop" className={({
              isActive
            }) => `text-sm font-medium hover:text-[#E4232C] transition-colors flex items-center gap-1 ${isActive ? 'text-[#E4232C]' : 'text-slate-700'}`}>
                <span>Shop</span>
                <ChevronDown size={14} className="text-slate-400" />
              </NavLink>

              {activeMegaMenu === 'spectacle' && <div className="absolute top-full left-0 w-52 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150 text-xs">
                  <Link to="/eyeglasses" onClick={() => setActiveMegaMenu(null)} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#E4232C]">
                    Eyeglasses (Spectacles)
                  </Link>
                  <Link to="/sunglasses" onClick={() => setActiveMegaMenu(null)} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#E4232C]">
                    Sunglasses
                  </Link>
                  <Link to="/contact-lenses" onClick={() => setActiveMegaMenu(null)} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#E4232C]">
                    Contact Lenses
                  </Link>
                  <Link to="/accessories" onClick={() => setActiveMegaMenu(null)} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#E4232C]">
                    Accessories & Care
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <Link to="/shop" onClick={() => setActiveMegaMenu(null)} className="block px-4 py-2 hover:bg-slate-50 font-bold text-[#14232E]">
                    View All Eyewear →
                  </Link>
                </div>}
            </div>

            <NavLink to="/sunglasses" className={({
            isActive
          }) => `text-sm font-medium py-2 hover:text-[#E4232C] transition-colors relative ${isActive ? 'text-[#E4232C]' : 'text-slate-700'}`}>
              Sunglasses
            </NavLink>

            <NavLink to="/contact-lenses" className={({
            isActive
          }) => `text-sm font-medium py-2 hover:text-[#E4232C] transition-colors relative ${isActive ? 'text-[#E4232C]' : 'text-slate-700'}`}>
              Contact Lenses
            </NavLink>

            <NavLink to="/accessories" className={({
            isActive
          }) => `text-sm font-medium py-2 hover:text-[#E4232C] transition-colors relative ${isActive ? 'text-[#E4232C]' : 'text-slate-700'}`}>
              Accessories
            </NavLink>

            <NavLink to="/about-us" className={({
            isActive
          }) => `text-sm font-medium py-2 hover:text-[#E4232C] transition-colors relative ${isActive ? 'text-[#E4232C]' : 'text-slate-700'}`}>
              About
            </NavLink>

          
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Toggle */}
            <button onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            setTimeout(() => searchInputRef.current?.focus(), 100);
          }} className="p-1.5 sm:p-2 text-slate-700 hover:text-[#E4232C] hover:bg-slate-50 rounded-full transition-colors cursor-pointer" aria-label="Search eyeglasses" title="Search">
              <Search size={19} />
            </button>

            {/* Account Link / Dropdown */}
            <div className="relative" ref={accountMenuRef}>
              <Link
                to={isAuthenticated ? "/account" : "/login"}
                className="flex items-center gap-1 p-1.5 sm:p-2 text-slate-700 hover:text-[#E4232C] hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                aria-label="Account options"
                title={isAuthenticated ? "My Account" : "Sign In"}
              >
                <UserIcon size={19} />
                <ChevronDown size={12} className="hidden sm:inline text-slate-400" />
              </Link>

              {/* Dropdown Menu */}
              {isAccountMenuOpen && <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {isAuthenticated && user ? <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <div className="text-[11px] text-slate-400">Signed in as</div>
                        <div className="text-xs font-bold text-[#14232E] truncate">{user.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                      </div>
                      <Link to="/account" onClick={() => setIsAccountMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#14232E]">
                        <UserIcon size={14} className="text-slate-400" />
                        <span>My Account</span>
                      </Link>
                      <Link to="/account?tab=orders" onClick={() => setIsAccountMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#14232E]">
                        <Package size={14} className="text-slate-400" />
                        <span>My Orders</span>
                      </Link>
                      <Link to="/wishlist" onClick={() => setIsAccountMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#14232E]">
                        <Heart size={14} className="text-slate-400" />
                        <span>Wishlist ({wishlistCount})</span>
                      </Link>
                      <div className="border-t border-slate-100 my-1" />
                      <button onClick={() => {
                  logout();
                  setIsAccountMenuOpen(false);
                }} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 cursor-pointer">
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </> : <div className="p-3 space-y-2">
                      <div className="text-xs text-slate-600 font-medium">
                        Welcome to The Lens Hut
                      </div>
                      <Link to="/login" onClick={() => setIsAccountMenuOpen(false)} className="block w-full py-2 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-semibold rounded text-center transition-colors">
                        Login
                      </Link>
                      <Link to="/signup" onClick={() => setIsAccountMenuOpen(false)} className="block w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#14232E] text-xs font-semibold rounded text-center transition-colors">
                        Create Account
                      </Link>
                    </div>}
                </div>}
            </div>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="relative p-1.5 sm:p-2 text-slate-700 hover:text-[#E4232C] hover:bg-slate-50 rounded-full transition-colors cursor-pointer" title="Wishlist" aria-label={`Wishlist with ${wishlistCount} items`}>
              <Heart size={19} strokeWidth={1.8} />
              <span className="absolute top-0 right-0 sm:top-0.5 sm:right-0.5 w-4 h-4 rounded-full bg-[#E4232C] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                {wishlistCount > 0 ? wishlistCount : 2}
              </span>
            </Link>

            {/* Cart Trigger */}
            <button onClick={() => setIsCartDrawerOpen(true)} className="relative p-1.5 sm:p-2 text-slate-700 hover:text-[#E4232C] hover:bg-slate-50 rounded-full transition-colors cursor-pointer" title="View Cart" aria-label={`Cart with ${cartCount} items`}>
              <ShoppingBag size={19} strokeWidth={1.8} />
              <span className="absolute top-0 right-0 sm:top-0.5 sm:right-0.5 w-4 h-4 rounded-full bg-[#E4232C] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                {cartCount > 0 ? cartCount : 1}
              </span>
            </button>
          </div>
        </div>

        {/* Live Search Drawer / Overlay */}
        {isSearchOpen && <div className="border-t border-slate-100 bg-[#F5F6F7] py-4 px-4 sm:px-6 animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search size={18} className="absolute left-3 text-slate-400" />
                <input ref={searchInputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by brand, frame shape (aviator, cat-eye, round), or model..." className="w-full pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] shadow-xs" />
                {searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="absolute right-12 text-slate-400 hover:text-slate-600 p-1">
                    <X size={16} />
                  </button>}
                <button type="submit" className="absolute right-2 px-3 py-1 bg-[#14232E] text-white text-xs font-semibold rounded hover:bg-[#E4232C] transition-colors">
                  Go
                </button>
              </form>

              {/* Instant Search Results Dropdown */}
              {searchResults.length > 0 && <div className="mt-3 bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden divide-y divide-slate-100">
                  {searchResults.map(p => <Link key={p.id} to={`/product/${p.slug}`} onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }} className="flex items-center gap-3 p-2.5 hover:bg-slate-50 transition-colors">
                      <div className="w-12 h-12 bg-slate-50 rounded p-1 shrink-0 flex items-center justify-center">
                        <img src={p.primaryImage} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          {p.brand}
                        </div>
                        <div className="text-xs font-bold text-[#14232E] truncate">
                          {p.name}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#14232E] tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}
                      </div>
                    </Link>)}
                  <Link to={`/shop?search=${encodeURIComponent(searchQuery)}`} onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }} className="block text-center py-2 text-xs font-semibold text-[#E4232C] hover:bg-slate-50 bg-slate-50/50">
                    View all matching results →
                  </Link>
                </div>}
            </div>
          </div>}
      </header>

      {/* Mobile Slide-Out Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>;
};