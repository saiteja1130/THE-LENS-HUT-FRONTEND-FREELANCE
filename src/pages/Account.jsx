import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User as UserIcon,
  Package,
  Settings,
  LogOut,
  Edit2,
  Mail,
  Phone,
  Calendar,
  Camera,
  RotateCcw,
  Headphones,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Account = () => {
  const {
    user,
    orders,
    logout,
    updateProfile
  } = useAuth();

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

  // Keep state in sync if user changes
  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '');
      setEditEmail(user.email || '');
    }
  }, [user]);

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

  if (!user) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <UserIcon size={28} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#14232E] tracking-tight">
          Sign in to access your account
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Please log in to manage your orders, prescription details, and personal preferences.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-[#E4232C] hover:bg-[#C81921] text-white rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all"
        >
          Login to Continue
        </Link>
      </div>
    );
  }

  // Status badge styling helper
  const getStatusBadge = (orderStatus) => {
    const statusMap = {
      Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      Processing: 'bg-blue-50 text-blue-700 border-blue-200/80',
      Shipped: 'bg-amber-50 text-amber-700 border-amber-200/80',
      Cancelled: 'bg-rose-50 text-rose-700 border-rose-200/80',
    };
    return statusMap[orderStatus] || 'bg-slate-50 text-slate-600 border-slate-200/80';
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* 1. Refined Hero Header Banner */}
      <section className="relative w-full bg-[#FAF8F5] border-b border-slate-200/70 overflow-hidden min-h-[200px] sm:min-h-[250px] flex items-center">
        {/* Full-Bleed Background Image on Right with soft gradient blend */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <img
            src="/images/checkout-hero.png"
            alt="The Lens Hut Account"
            className="w-full h-full object-cover object-[82%_center] sm:object-[86%_center] lg:object-[88%_center] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/95 sm:via-[#FAF8F5]/80 to-transparent w-full md:w-[65%]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <Link to="/" className="hover:text-[#E4232C] transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#E4232C] font-semibold">My Account</span>
          </nav>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            My Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Manage your personal profile, active orders, and optical preferences.
          </p>
        </div>

        {/* Brand Slogan */}
        <div className="hidden xl:block absolute top-7 right-8 lg:right-14 z-10 pointer-events-none select-none text-right">
          <span className="font-serif italic text-slate-800 text-xl lg:text-2xl font-bold tracking-tight -rotate-2 block leading-tight drop-shadow-xs">
            Better Vision,<br />Brighter Tomorrow.
          </span>
          <div className="w-16 h-1 bg-[#E4232C] rounded-full mt-1.5 ml-auto -rotate-1"></div>
        </div>
      </section>

      {/* 2. Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Sidebar Navigation Card */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
            {/* User Profile Mini Header */}
            <div className="flex flex-col items-center text-center pb-5 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs mb-3 flex items-center justify-center bg-[#F8F9FA] text-[#14232E]">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name || 'Account'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-extrabold text-[#14232E]">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[#14232E] line-clamp-1">
                {user?.name || 'My Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                {user?.email || ''}
              </p>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
                { id: 'profile', label: 'Profile Information', icon: <UserIcon size={16} /> },
                { id: 'orders', label: 'My Orders', icon: <Package size={16} /> },
                { id: 'settings', label: 'Account Settings', icon: <Settings size={16} /> }
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-rose-50/80 text-[#E4232C] font-bold border-l-2 border-[#E4232C]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#14232E]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#E4232C]' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-[#E4232C]" />}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-[#E4232C] hover:bg-rose-50/60 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* 1. Profile Information Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                        Profile Information
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Your registered details and contact information
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="text-xs font-bold text-slate-600 hover:text-[#E4232C] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/80 hover:border-slate-300 cursor-pointer shadow-2xs"
                    >
                      <Edit2 size={12} />
                      <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      {/* Avatar with Camera badge */}
                      <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs flex items-center justify-center bg-[#F8F9FA]">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user?.name || 'User'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl font-extrabold text-[#14232E]">
                              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </span>
                          )}
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
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
                        {/* Full Name */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA] border border-slate-100">
                          <div className="w-9 h-9 rounded-lg bg-white text-slate-500 border border-slate-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                            <UserIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Full Name
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E] truncate block">
                              {user?.name || 'Not provided'}
                            </span>
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA] border border-slate-100">
                          <div className="w-9 h-9 rounded-lg bg-white text-slate-500 border border-slate-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                            <Phone size={16} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Phone Number
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E] truncate block">
                              {user?.phone || 'Not provided'}
                            </span>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA] border border-slate-100">
                          <div className="w-9 h-9 rounded-lg bg-white text-slate-500 border border-slate-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                            <Mail size={16} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Email Address
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E] truncate block">
                              {user?.email || 'Not provided'}
                            </span>
                          </div>
                        </div>

                        {/* Member Since */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA] border border-slate-100">
                          <div className="w-9 h-9 rounded-lg bg-white text-slate-500 border border-slate-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                            <Calendar size={16} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] text-slate-400 block font-medium">
                              Member Since
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14232E] truncate block">
                              {user?.joinedDate || (user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Member')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Recent Orders Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                        Recent Orders
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Your latest eyewear purchases and fulfillment status
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab('orders')}
                      className="text-xs font-bold text-[#E4232C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All Orders</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {displayOrders.length === 0 ? (
                    <div className="py-10 text-center text-slate-500 space-y-2.5">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                        <Package size={24} />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#14232E]">No orders placed yet</p>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Your recent eyewear purchases will appear here after checkout with instant tracking.
                      </p>
                      <Link
                        to="/eyeglasses"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#E4232C] hover:underline"
                      >
                        <span>Explore Eyewear Catalog</span>
                        <span>→</span>
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Mobile Order Cards (block md:hidden) */}
                      <div className="block md:hidden space-y-3">
                        {displayOrders.slice(0, 5).map((order) => {
                          const orderId = order.orderNumber || order.id || order._id;
                          const orderDate = order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently');
                          const orderStatus = order.orderStatus || order.status || 'Processing';
                          const orderTotal = Number(order.totalAmount !== undefined ? order.totalAmount : order.total) || 0;
                          const orderImage =
                            order.image ||
                            order.items?.[0]?.image ||
                            order.items?.[0]?.product?.images?.front ||
                            order.items?.[0]?.product?.colors?.[0]?.images?.front ||
                            order.items?.[0]?.product?.primaryImage ||
                            '';

                          const itemCount = order.itemCountText || `${order.items?.length || 1} item${order.items?.length > 1 ? 's' : ''}`;

                          return (
                            <div
                              key={orderId}
                              className="p-3.5 bg-[#F8F9FA] border border-slate-200/70 rounded-xl space-y-2.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-xs text-[#14232E]">
                                  {orderId}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(orderStatus)}`}
                                >
                                  {orderStatus}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs pt-1">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-10 h-9 bg-white rounded-lg p-1 border border-slate-200/80 shrink-0 flex items-center justify-center">
                                    <img
                                      src={orderImage}
                                      alt="Product"
                                      className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-[11px] text-slate-400 block">{orderDate}</span>
                                    <span className="text-xs font-semibold text-slate-700">{itemCount}</span>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <span className="font-extrabold text-xs sm:text-sm text-[#14232E] block tabular-nums">
                                    ₹{orderTotal.toLocaleString('en-IN')}
                                  </span>
                                  <Link
                                    to={`/order/${encodeURIComponent(orderId)}`}
                                    className="text-[11px] font-bold text-[#E4232C] hover:underline cursor-pointer"
                                  >
                                    View Details →
                                  </Link>
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
                            <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
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
                              const orderId = order.orderNumber || order.id || order._id;
                              const orderDate = order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently');
                              const orderStatus = order.orderStatus || order.status || 'Processing';
                              const orderTotal = Number(order.totalAmount !== undefined ? order.totalAmount : order.total) || 0;
                              const orderImage =
                                order.image ||
                                order.items?.[0]?.image ||
                                order.items?.[0]?.product?.images?.front ||
                                order.items?.[0]?.product?.colors?.[0]?.images?.front ||
                                order.items?.[0]?.product?.primaryImage ||
                                '';

                              const itemCount = order.itemCountText || `${order.items?.length || 1} item${order.items?.length > 1 ? 's' : ''}`;

                              return (
                                <tr key={orderId} className="hover:bg-slate-50/70 transition-colors">
                                  <td className="py-3.5 font-bold text-[#14232E]">
                                    {orderId}
                                  </td>
                                  <td className="py-3.5 text-slate-500">
                                    {orderDate}
                                  </td>
                                  <td className="py-3.5">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 bg-[#F8F9FA] rounded-md p-1 border border-slate-200/60 flex items-center justify-center shrink-0">
                                        <img
                                          src={orderImage}
                                          alt="Product"
                                          className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                      </div>
                                      <span className="text-slate-700 font-medium">{itemCount}</span>
                                    </div>
                                  </td>
                                  <td className="py-3.5 font-extrabold text-[#14232E] tabular-nums">
                                    ₹{orderTotal.toLocaleString('en-IN')}
                                  </td>
                                  <td className="py-3.5">
                                    <span
                                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(orderStatus)}`}
                                    >
                                      {orderStatus}
                                    </span>
                                  </td>
                                  <td className="py-3.5 text-right">
                                    <Link
                                      to={`/order/${encodeURIComponent(orderId)}`}
                                      className="text-slate-600 hover:text-[#E4232C] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                      <span>View Details</span>
                                      <ArrowRight size={12} className="text-[#E4232C]" />
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>

                {/* 3. Bottom Row: Quick Links */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
                  <h2 className="text-base sm:text-lg font-bold text-[#14232E] pb-4 border-b border-slate-100 mb-4">
                    Quick Links
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                    {/* Shipping Policy */}
                    <Link
                      to="/terms"
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 group cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/50 flex items-center justify-center shrink-0 group-hover:bg-rose-50 group-hover:text-[#E4232C] transition-colors">
                          <Package size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#14232E] group-hover:text-[#E4232C] transition-colors">
                            Shipping Policy
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Delivery charges & time
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Return Policy */}
                    <Link
                      to="/returns-policy"
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 group cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/50 flex items-center justify-center shrink-0 group-hover:bg-rose-50 group-hover:text-[#E4232C] transition-colors">
                          <RotateCcw size={16} />
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
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 group cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/50 flex items-center justify-center shrink-0 group-hover:bg-rose-50 group-hover:text-[#E4232C] transition-colors">
                          <Headphones size={16} />
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
            )}

            {/* TAB 2: MY ORDERS (Complete Orders Detailed View) */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                      All Orders
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Real-time status updates, prescription data, and tracking details
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTab('dashboard')}
                    className="text-xs font-semibold text-[#E4232C] hover:underline cursor-pointer"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                {displayOrders.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 space-y-3">
                    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <Package size={26} />
                    </div>
                    <h3 className="text-sm font-bold text-[#14232E]">No order history found</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      You haven't placed any eyewear orders yet. Start exploring our high-precision optical lenses and stylish frames!
                    </p>
                    <Link
                      to="/eyeglasses"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-[#14232E] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayOrders.map((order) => {
                      const orderId = order.orderNumber || order.id || order._id;
                      const isExpanded = expandedOrderId === orderId;
                      const orderDate = order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently');
                      const orderStatus = order.orderStatus || order.status || 'Processing';
                      const orderTotal = Number(order.totalAmount !== undefined ? order.totalAmount : order.total) || 0;
                      const trackingNum = order.trackingNumber || order.tracking?.trackingNumber || order.tracking?.trackingId || '';
                      const courier = order.tracking?.courierName || '';
                      const estDelivery = order.estimatedDelivery || order.tracking?.estimatedDelivery || '';

                      return (
                        <div
                          key={orderId}
                          className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-all space-y-4 bg-white shadow-2xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="font-extrabold text-[#14232E] text-sm">
                                {orderId}
                              </span>
                              <span className="text-slate-300">|</span>
                              <span className="text-slate-500 font-medium">
                                Placed on {orderDate}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(orderStatus)}`}
                              >
                                ● {orderStatus}
                              </span>
                              <button
                                type="button"
                                onClick={() => setExpandedOrderId(isExpanded ? null : orderId)}
                                className="text-xs text-[#E4232C] font-bold flex items-center gap-1 ml-2 cursor-pointer hover:underline"
                              >
                                <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>
                            </div>
                          </div>

                          {/* Expanded Order Details */}
                          {isExpanded && (
                            <div className="pt-2 pb-3 space-y-4 border-b border-slate-100">
                              {/* Items Breakdown */}
                              <div className="space-y-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                                  Items Ordered ({order.items?.length || 0})
                                </span>
                                <div className="divide-y divide-slate-100">
                                  {order.items?.map((item, idx) => {
                                    const itemImg =
                                      item.image ||
                                      item.product?.images?.front ||
                                      item.product?.colors?.[0]?.images?.front ||
                                      item.product?.primaryImage ||
                                      '';
                                    const itemPrice = Number(item.unitPrice || item.product?.price || 0);

                                    return (
                                      <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                                        <div className="flex items-center gap-3">
                                          <div className="w-12 h-11 bg-[#F8F9FA] border border-slate-200/80 rounded-lg p-1 flex items-center justify-center shrink-0">
                                            <img
                                              src={itemImg}
                                              alt={item.name}
                                              className="w-full h-full object-contain mix-blend-multiply"
                                            />
                                          </div>
                                          <div>
                                            <h4 className="font-bold text-[#14232E]">{item.name}</h4>
                                            <p className="text-[11px] text-slate-400">
                                              {item.brand || 'The Lens Hut'} · Color: {item.selectedColor || 'Standard'} · Qty: {item.quantity}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <span className="font-bold text-[#14232E] tabular-nums">
                                            ₹{(itemPrice * (item.quantity || 1)).toLocaleString('en-IN')}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Prescription Details (if present) */}
                              {order.prescription?.hasPrescription && (
                                <div className="bg-[#F8F9FA] border border-slate-200/80 rounded-xl p-3.5 text-xs space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-[#14232E]">Optical Prescription Attached</span>
                                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                                      {order.prescription.lensPackage || 'Optical Lab Custom Lens'}
                                    </span>
                                  </div>
                                  {order.prescription.fileUrl ? (
                                    <div className="flex items-center justify-between pt-1 text-[11px]">
                                      <div className="text-slate-700 truncate max-w-[200px] sm:max-w-xs">
                                        <strong>Document:</strong> {order.prescription.fileName || 'Prescription Document'}
                                      </div>
                                      <a
                                        href={order.prescription.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-[#E4232C] hover:underline shrink-0 ml-2"
                                      >
                                        View / Download Document →
                                      </a>
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 pt-1">
                                      <div><strong>Right (OD) Sph:</strong> {order.prescription.rightEye?.sph || '0.00'}</div>
                                      <div><strong>Right Cyl:</strong> {order.prescription.rightEye?.cyl || '0.00'}</div>
                                      <div><strong>Left (OS) Sph:</strong> {order.prescription.leftEye?.sph || '0.00'}</div>
                                      <div><strong>Left Cyl:</strong> {order.prescription.leftEye?.cyl || '0.00'}</div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Delivery & Courier Tracking Summary */}
                              <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-3.5 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                                    SHIPPING ADDRESS
                                  </span>
                                  <p className="font-bold text-[#14232E]">{order.shippingAddress?.fullName}</p>
                                  <p className="text-slate-600 text-[11px] leading-relaxed">
                                    {order.shippingAddress?.street}, {order.shippingAddress?.locality ? `${order.shippingAddress.locality}, ` : ''}{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                                  </p>
                                  <p className="text-slate-500 text-[11px] mt-0.5">Phone: {order.shippingAddress?.phone}</p>
                                </div>
                                <div>
                                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                                    COURIER & DISPATCH
                                  </span>
                                  <p className="font-medium text-slate-700">Courier: <strong className="text-[#14232E]">{courier || 'Pending dispatch'}</strong></p>
                                  <p className="font-medium text-slate-700">Tracking ID: <span className="font-mono text-[#14232E]">{trackingNum || 'Pending'}</span></p>
                                  {estDelivery && (
                                    <p className="font-medium text-emerald-700 text-[11px] mt-0.5">Est. Delivery: {estDelivery}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Order Summary & Pricing */}
                          <div className="flex items-center justify-between text-xs pt-1">
                            <div className="text-slate-500">
                              Total: <strong className="text-[#14232E] font-extrabold text-sm tabular-nums">₹{orderTotal.toLocaleString('en-IN')}</strong>
                              {order.paymentMethod && <span className="text-slate-400 ml-2">({order.paymentMethod})</span>}
                            </div>
                            {trackingNum ? (
                              <Link
                                to={`/track-order?trackingId=${encodeURIComponent(trackingNum)}`}
                                className="text-xs font-bold text-[#14232E] hover:text-[#E4232C] flex items-center gap-1 transition-colors"
                              >
                                <span>Live Tracking</span>
                                <ChevronRight size={14} />
                              </Link>
                            ) : (
                              <span className="text-[11px] text-slate-400">
                                Tracking available once shipped
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PROFILE DETAILS */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                      Profile Information
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Update your account contact details and display name
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTab('dashboard')}
                    className="text-xs font-semibold text-[#E4232C] hover:underline cursor-pointer"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full h-11 px-4 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      disabled
                      className="w-full h-11 px-4 border border-slate-200 bg-slate-50 text-slate-400 rounded-xl text-xs sm:text-sm cursor-not-allowed"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Email address is linked to your account identity and cannot be altered directly.
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full h-11 px-4 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] focus:outline-none focus:border-[#14232E] focus:ring-1 focus:ring-[#14232E] transition-all"
                      required
                    />
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#E4232C] hover:bg-[#C81921] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      Save Changes
                    </button>
                    {profileSaved && (
                      <span className="text-xs text-emerald-600 font-semibold">
                        Profile updated successfully!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#14232E]">
                      Account Settings
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Manage authentication credentials and account preferences
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTab('dashboard')}
                    className="text-xs font-semibold text-[#E4232C] hover:underline cursor-pointer"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                <div className="space-y-4 max-w-lg text-xs">
                  <div className="border border-slate-200/80 rounded-2xl p-5 space-y-3 bg-[#F8F9FA]/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/70 text-[#14232E] flex items-center justify-center shadow-2xs">
                        <Shield size={16} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#14232E]">Security & Credentials</h3>
                        <p className="text-[11px] text-slate-400">Manage your password and security recovery</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed pt-1">
                      Keep your account safe by updating your password periodically or initiating a secure reset.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => navigate('/reset-password')}
                        className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-[#14232E] hover:text-[#E4232C] transition-all shadow-2xs cursor-pointer"
                      >
                        Change Password
                      </button>
                    </div>
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

export default Account;