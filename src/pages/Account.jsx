import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User as UserIcon,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit2,
  Mail,
  Phone,
  Calendar,
  Camera,
  Truck,
  RotateCcw,
  Headphones,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

export const Account = () => {
  const {
    user,
    orders,
    logout,
    updateProfile
  } = useAuth();

  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const { toast, showConfirm } = useNotification();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  // Redirect unauthenticated visitors to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [profileSaved, setProfileSaved] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const setTab = (tab) => {
    setSearchParams({ tab });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone
    });
    setIsEditingProfile(false);
    setProfileSaved(true);
    toast.success('Profile details updated successfully');
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleLogout = () => {
    showConfirm({
      title: 'Sign Out of Account',
      message: 'Are you sure you want to end your current session? You can sign back in anytime.',
      confirmText: 'Sign Out',
      cancelText: 'Stay Signed In',
      destructive: true,
      onConfirm: () => {
        logout();
        toast.info('Signed out successfully');
        navigate('/');
      }
    });
  };

  // Real user orders
  const displayOrders = orders && orders.length > 0 ? orders : [];

  // Actual wishlist preview items from user wishlist
  const wishlistPreviewItems = (wishlist || []).slice(0, 3).map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    slug: item.slug,
    price: item.price,
    mrp: item.mrp,
    discountPercent: item.discountPercent,
    image: item.images?.front || item.primaryImage || item.image || '',
    isFav: true,
  }));

  if (!user) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold text-[#14232E]">Sign in to access your account</h2>
        <Link to="/login" className="inline-block px-5 py-2.5 bg-[#E4232C] text-white rounded text-xs font-semibold">
          Login to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* 1. Hero Banner matching exact screenshot with /images/wishlist/wishlist-hero.png */}
      <section className="relative w-full bg-[#FAF8F5] overflow-hidden min-h-[200px] sm:min-h-[300px]  flex items-center">
        {/* Full-Bleed Background Image on Right with top alignment to prevent cropping */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <img
            src="/images/checkout-hero.png"
            alt="Our collection banner"
            className="w-full h-full object-cover object-[82%_center] sm:object-[86%_center] lg:object-[88%_center] transition-all duration-500"
          />
          {/* Smooth gradient blend for crisp text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 sm:via-[#FAF8F5]/75 to-transparent w-full md:w-[62%]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2.5 font-medium">
            <Link to="/" className="hover:text-[#E4232C] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-[#E4232C] font-semibold">My Account</span>
          </nav>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            My Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
            Manage your profile, orders, and more.
          </p>
        </div>

        {/* Slogan with stylish cursive typography & underline placed at top-right clear of model's face */}
        <div className="hidden xl:block absolute top-7 right-8 lg:right-14 z-10 pointer-events-none select-none text-right">
          <span className="font-serif italic text-slate-800 text-xl lg:text-2xl font-bold tracking-tight -rotate-3 block leading-tight drop-shadow-xs">
            Better Vision,<br />Brighter Tomorrow.
          </span>
          <div className="w-16 h-1 bg-[#E4232C] rounded-full mt-1.5 ml-auto -rotate-2"></div>
        </div>
      </section>

      {/* 2. Main 2-Column Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation Card */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            {/* User Profile Mini Header */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs mb-2.5">
                <img
                  src={user?.avatar || '/images/home/promo-sunglasses-man.png'}
                  alt={user?.name || 'Account'}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base font-bold text-[#14232E]">
                {user?.name || 'My Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {user?.email || ''}
              </p>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
                { id: 'profile', label: 'Profile Information', icon: <UserIcon size={17} /> },
                { id: 'orders', label: 'My Orders', icon: <Package size={17} /> },
                { id: 'wishlist', label: 'Wishlist', icon: <Heart size={17} />, badge: 2 },
                { id: 'settings', label: 'Account Settings', icon: <Settings size={17} /> }
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === 'wishlist') {
                        navigate('/wishlist');
                      } else {
                        setTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive
                      ? 'bg-rose-50 text-[#E4232C] font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#14232E]'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#E4232C]' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="w-5 h-5 rounded-full bg-[#E4232C] text-white text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 transition-colors cursor-pointer"
                >
                  <LogOut size={17} />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* TAB: DASHBOARD (Exact Replica of Screenshot) */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 1. Profile Information Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <h2 className="text-base font-bold text-[#14232E]">
                      Profile Information
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="text-xs font-bold text-slate-600 hover:text-[#E4232C] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 size={13} />
                      <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
                    </button>
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      {/* Avatar with Camera badge */}
                      <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs">
                          <img
                            src={user?.avatar || '/images/home/promo-sunglasses-man.png'}
                            alt={user?.name || 'User'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#14232E] text-white flex items-center justify-center hover:bg-[#E4232C] transition-colors shadow-xs cursor-pointer"
                          title="Change photo"
                        >
                          <Camera size={12} />
                        </button>
                      </div>

                      {/* 4 Details in 2x2 Grid */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 w-full">
                        {/* Full Name */}
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                            <UserIcon size={16} />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Full Name
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E]">
                              {user?.name || 'Not provided'}
                            </span>
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                            <Phone size={16} />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Phone Number
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E]">
                              {user?.phone || 'Not provided'}
                            </span>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                            <Mail size={16} />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Email Address
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E]">
                              {user?.email || 'Not provided'}
                            </span>
                          </div>
                        </div>

                        {/* Member Since */}
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                            <Calendar size={16} />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Member Since
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E]">
                              {user?.joinedDate || 'May 2025'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Recent Orders Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <h2 className="text-base font-bold text-[#14232E]">
                      Recent Orders
                    </h2>
                    <button
                      type="button"
                      onClick={() => setTab('orders')}
                      className="text-xs font-bold text-[#E4232C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All Orders</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Mobile Order Cards (block md:hidden) */}
                  <div className="block md:hidden space-y-3">
                    {displayOrders.slice(0, 5).map((order) => {
                      const orderImage =
                        order.image ||
                        order.items?.[0]?.product?.images?.front ||
                        order.items?.[0]?.product?.colors?.[0]?.images?.front ||
                        order.items?.[0]?.product?.primaryImage ||
                        '';

                      const itemCount = order.itemCountText || `${order.items?.length || 1} item`;

                      const statusStyles = {
                        Delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                        Processing: 'bg-blue-50 text-blue-700 border border-blue-100',
                        Shipped: 'bg-amber-50 text-amber-700 border border-amber-100'
                      };

                      return (
                        <div
                          key={order.id}
                          className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#14232E]">
                              {order.id}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyles[order.status] || 'bg-slate-100 text-slate-600'
                                }`}
                            >
                              {order.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-8 bg-white rounded p-1 border border-slate-200 shrink-0 flex items-center justify-center">
                                <img
                                  src={orderImage}
                                  alt="Product"
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              </div>
                              <div>
                                <span className="text-[11px] text-slate-400 block">{order.date}</span>
                                <span className="text-xs font-semibold text-slate-700">{itemCount}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-extrabold text-xs sm:text-sm text-[#14232E] block tabular-nums">
                                ₹{order.total.toLocaleString('en-IN')}
                              </span>
                              <button
                                type="button"
                                onClick={() => setTab('orders')}
                                className="text-[11px] font-bold text-[#E4232C] hover:underline cursor-pointer"
                              >
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Orders Table (hidden md:block) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[550px]">
                      <thead>
                        <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                          <th className="pb-3 font-semibold">Order ID</th>
                          <th className="pb-3 font-semibold">Date</th>
                          <th className="pb-3 font-semibold">Items</th>
                          <th className="pb-3 font-semibold">Total</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {displayOrders.slice(0, 5).map((order) => {
                          const orderImage =
                            order.image ||
                            order.items?.[0]?.product?.images?.front ||
                            order.items?.[0]?.product?.colors?.[0]?.images?.front ||
                            order.items?.[0]?.product?.primaryImage ||
                            '';

                          const itemCount = order.itemCountText || `${order.items?.length || 1} item`;

                          const statusStyles = {
                            Delivered: 'bg-emerald-50 text-emerald-600',
                            Processing: 'bg-blue-50 text-blue-600',
                            Shipped: 'bg-amber-50 text-amber-600'
                          };

                          return (
                            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3.5 font-bold text-[#14232E]">
                                {order.id}
                              </td>
                              <td className="py-3.5 text-slate-500">
                                {order.date}
                              </td>
                              <td className="py-3.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-7 bg-[#F5F6F7] rounded p-1 flex items-center justify-center shrink-0">
                                    <img
                                      src={orderImage}
                                      alt="Product"
                                      className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                  </div>
                                  <span className="text-slate-600 font-medium">{itemCount}</span>
                                </div>
                              </td>
                              <td className="py-3.5 font-bold text-[#14232E] tabular-nums">
                                ₹{order.total.toLocaleString('en-IN')}
                              </td>
                              <td className="py-3.5">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyles[order.status] || 'bg-slate-100 text-slate-600'
                                    }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => setTab('orders')}
                                  className="text-slate-500 hover:text-[#E4232C] font-semibold flex items-center justify-end gap-1 ml-auto cursor-pointer"
                                >
                                  <span>View Details</span>
                                  <ArrowRight size={12} className="text-[#E4232C]" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Bottom Row: 2-Cards Grid (Wishlist Preview & Quick Links) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Wishlist Preview Card (lg:col-span-8) */}
                  <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                      <div className="flex items-center gap-2">
                        <Heart size={16} className="text-slate-500" />
                        <h2 className="text-base font-bold text-[#14232E]">
                          Wishlist
                        </h2>
                      </div>
                      <Link
                        to="/wishlist"
                        className="text-xs font-bold text-slate-500 hover:text-[#E4232C] flex items-center gap-1 transition-colors"
                      >
                        <span>View All</span>
                        <ArrowRight size={13} className="text-[#E4232C]" />
                      </Link>
                    </div>

                    {/* 3 Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {wishlistPreviewItems.map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col justify-between"
                        >
                          <div className="relative aspect-4/3 bg-[#F8F9FA] p-3 flex items-center justify-center">
                            {/* Discount badge */}
                            <span className="absolute top-2 left-2 bg-[#E4232C] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                              {prod.discountPercent}% OFF
                            </span>

                            {/* Heart indicator */}
                            <button
                              type="button"
                              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-[#E4232C]"
                            >
                              <Heart
                                size={14}
                                className={prod.isFav ? 'fill-[#E4232C] text-[#E4232C]' : ''}
                              />
                            </button>

                            <Link to={`/product/${prod.slug}`} className="w-full h-full flex items-center justify-center">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform"
                              />
                            </Link>
                          </div>

                          <div className="p-3 space-y-1">
                            <Link to={`/product/${prod.slug}`}>
                              <h4 className="text-xs font-bold text-[#14232E] hover:text-[#E4232C] line-clamp-1">
                                {prod.name}
                              </h4>
                            </Link>
                            <p className="text-[10px] text-slate-400 capitalize">
                              {prod.category}
                            </p>
                            <div className="flex items-baseline gap-1.5 pt-1">
                              <span className="text-xs font-bold text-[#14232E] tabular-nums">
                                ₹{prod.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-slate-400 line-through tabular-nums">
                                ₹{prod.mrp.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Quick Links Card (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
                    <h2 className="text-base font-bold text-[#14232E] pb-4 border-b border-slate-100 mb-4">
                      Quick Links
                    </h2>

                    <div className="space-y-4 text-xs">
                      {/* Track Your Order */}
                      <Link
                        to="/track-order"
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-rose-50 group-hover:text-[#E4232C] transition-colors">
                            <Truck size={17} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                              Track Your Order
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              Check your order status
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      {/* Shipping Policy */}
                      <Link
                        to="/terms"
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-rose-50 group-hover:text-[#E4232C] transition-colors">
                            <Package size={17} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                              Shipping Policy
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              Know about shipping charges & time
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      {/* Return Policy */}
                      <Link
                        to="/returns-policy"
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-rose-50 group-hover:text-[#E4232C] transition-colors">
                            <RotateCcw size={17} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                              Return Policy
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              Easy returns within 7 days
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      {/* Help Center */}
                      <Link
                        to="/faqs"
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-rose-50 group-hover:text-[#E4232C] transition-colors">
                            <Headphones size={17} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                              Help Center
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              Get instant support
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MY ORDERS (Complete Orders Detailed View) */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#14232E]">
                      All Orders & Tracking
                    </h2>
                    <p className="text-xs text-slate-500">
                      Real-time status updates and order lifecycle
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTab('dashboard')}
                    className="text-xs font-semibold text-[#E4232C] hover:underline"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                <div className="space-y-4">
                  {displayOrders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                      <div
                        key={order.id}
                        className="border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-slate-300 transition-colors space-y-4 bg-white"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-extrabold text-[#14232E] text-sm">
                              {order.id}
                            </span>
                            <span className="text-slate-300">|</span>
                            <span className="text-slate-500 font-medium">
                              Placed on {order.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-bold px-3 py-1 rounded-full ${order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-700'
                                : order.status === 'Processing'
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-amber-50 text-amber-700'
                                }`}
                            >
                              ● {order.status}
                            </span>
                            <button
                              type="button"
                              onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                              className="text-xs text-[#E4232C] font-bold flex items-center gap-1 ml-2 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide' : 'Track'}</span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                          </div>
                        </div>

                        {/* Order Summary & Pricing */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <div className="text-slate-500">
                            Total: <strong className="text-[#14232E] font-bold text-sm">₹{order.total.toLocaleString('en-IN')}</strong>
                          </div>
                          <Link
                            to="/track-order"
                            className="text-xs font-semibold text-[#14232E] hover:text-[#E4232C] flex items-center gap-1"
                          >
                            <span>Live Tracking</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: PROFILE DETAILS */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-[#14232E]">
                    Profile Information
                  </h2>
                  <button
                    type="button"
                    onClick={() => setTab('dashboard')}
                    className="text-xs font-semibold text-[#E4232C] hover:underline"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      disabled
                      className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-400 rounded-xl text-xs sm:text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Save Changes
                  </button>
                  {profileSaved && (
                    <span className="text-xs text-emerald-600 font-semibold ml-3">
                      Profile updated successfully!
                    </span>
                  )}
                </form>
              </div>
            )}


            {/* TAB: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-[#14232E]">
                    Account Settings
                  </h2>
                  <button
                    type="button"
                    onClick={() => setTab('dashboard')}
                    className="text-xs font-semibold text-[#E4232C] hover:underline"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                <div className="space-y-4 max-w-lg text-xs">
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                    <h3 className="font-bold text-sm text-[#14232E]">Security</h3>
                    <p className="text-slate-500">
                      Manage your password and active login sessions.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/reset-password')}
                      className="px-4 py-2 border border-slate-300 rounded-lg font-semibold text-[#14232E] hover:bg-slate-50 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

    </div>
  );
};