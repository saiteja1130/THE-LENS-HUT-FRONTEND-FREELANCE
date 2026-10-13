import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  Search,
  Eye,
  MapPin,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { orderApi } from '../services/orderApi';
import { useNotification } from '../context/NotificationContext';

const TIMELINE_STEPS = [
  {
    key: 'placed',
    title: 'Order Confirmed',
    description: 'Payment verified & order sent to optical laboratory',
    icon: CheckCircle2,
  },
  {
    key: 'processing',
    title: 'Lab Lens Shaping & Fitting',
    description: 'Prescription calibrated and custom-fitted by optometrists',
    icon: Sparkles,
  },
  {
    key: 'shipped',
    title: 'Quality Checked & Dispatched',
    description: 'Packaged with protective hard case and handed to courier',
    icon: Truck,
  },
  {
    key: 'delivered',
    title: 'Delivered',
    description: 'Safely delivered to your doorstep with 14-day warranty',
    icon: Package,
  },
];

export const TrackOrder = () => {
  const { orderId: paramOrderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useNotification();
  const navigate = useNavigate();

  const queryId = searchParams.get('orderId') || searchParams.get('trackingId') || paramOrderId || '';
  const [searchInput, setSearchInput] = useState(queryId);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch order data when queryId changes
  useEffect(() => {
    if (!queryId) {
      setOrder(null);
      return;
    }

    const fetchOrder = async () => {
      setIsLoading(true);
      setErrorMsg('');

      try {
        const res = await orderApi.getOrderById(queryId, { mode: 'track' });
        if (res && res.success && res.data) {
          setOrder(res.data);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('[TrackOrder] API lookup failed, trying local storage:', err);
      }

      // Local storage fallback
      try {
        const localOrders = [
          ...(JSON.parse(localStorage.getItem('tlh_orders') || '[]')),
          ...(JSON.parse(localStorage.getItem('thelenshut_orders') || '[]')),
        ];

        const match = localOrders.find(
          (o) =>
            o.id?.toLowerCase() === queryId.toLowerCase() ||
            o.orderNumber?.toLowerCase() === queryId.toLowerCase() ||
            o.trackingNumber?.toLowerCase() === queryId.toLowerCase() ||
            o.tracking?.trackingNumber?.toLowerCase() === queryId.toLowerCase()
        );

        if (match) {
          setOrder(match);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        // ignore
      }

      setIsLoading(false);
      setErrorMsg(`Could not find order details for "${queryId}". Please check the order or tracking number.`);
    };

    fetchOrder();
  }, [queryId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = searchInput.trim();
    if (!clean) {
      toast.warning('Please enter an order number or tracking ID');
      return;
    }
    setSearchParams({ orderId: clean });
  };

  const getActiveStepIndex = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('delivered')) return 3;
    if (s.includes('shipped') || s.includes('dispatch')) return 2;
    if (s.includes('process') || s.includes('lab')) return 1;
    return 0;
  };

  const currentStep = order ? getActiveStepIndex(order.orderStatus || order.status) : 0;
  const isCancelled = (order?.orderStatus || order?.status || '').toLowerCase() === 'cancelled';

  const orderNumber = order?.orderNumber || order?.id || queryId;
  const trackingNumber = order?.trackingNumber || order?.tracking?.trackingNumber || order?.tracking?.trackingId || 'LH-EXP-000000';
  const courierName = order?.tracking?.courierName || 'Delhivery Express';
  const estimatedDelivery = order?.estimatedDelivery || order?.tracking?.estimatedDelivery || 'Within 3–5 Business Days';
  const orderDate = order?.date || (order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently');
  const orderTotal = Number(order?.totalAmount !== undefined ? order.totalAmount : (order?.total || 0));

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header & Lookup Bar */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-[#E4232C] rounded-full text-xs font-bold uppercase tracking-wider">
            <Truck size={14} />
            <span>Real-Time Order & Optical Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#14232E] tracking-tight">
            Track Your Eyewear Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your Lens Hut order number (<code className="text-[#14232E] font-semibold">LH-XXXXXX</code>) or courier tracking number to inspect status and lab crafting progress.
          </p>

          <form onSubmit={handleSearch} className="pt-2 max-w-lg mx-auto flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. LH-482910 or LH-EXP-109283"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14232E] font-medium shadow-2xs focus:outline-none focus:border-[#14232E]"
              />
              <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#14232E] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Track</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3 shadow-2xs">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-[#E4232C] rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-600">Locating optical laboratory dispatch logs...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMsg && (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center space-y-3 shadow-2xs max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-sm font-bold text-[#14232E]">Order Not Found</h3>
            <p className="text-xs text-slate-500">{errorMsg}</p>
            <div className="pt-2">
              <Link
                to="/account?tab=orders"
                className="text-xs font-bold text-[#E4232C] hover:underline"
              >
                View orders from your account dashboard →
              </Link>
            </div>
          </div>
        )}

        {/* Loaded Order View */}
        {!isLoading && order && (
          <div className="space-y-6">
            {/* 1. Order Status Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#14232E]">
                      Order #{orderNumber}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide ${
                        isCancelled
                          ? 'bg-rose-50 text-rose-700 border border-rose-100'
                          : order.orderStatus === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}
                    >
                      ● {isCancelled ? 'Cancelled' : order.orderStatus || order.status || 'Processing'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Placed on <strong className="text-slate-700">{orderDate}</strong> · Payment: <strong className="text-slate-700">{order.paymentMethod || 'UPI'}</strong> ({order.paymentStatus || 'Paid'})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print Invoice</span>
                  </button>
                  <Link
                    to="/contact-us"
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Support</span>
                  </Link>
                </div>
              </div>

              {/* 2. Interactive Fulfillment Timeline */}
              {!isCancelled ? (
                <div className="py-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-6">
                    Fulfillment & Optical Assembly Timeline
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
                    {TIMELINE_STEPS.map((step, idx) => {
                      const isCompleted = idx <= currentStep;
                      const isCurrent = idx === currentStep;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="space-y-3 relative">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                isCompleted
                                  ? 'bg-[#14232E] text-white shadow-2xs'
                                  : 'bg-slate-100 text-slate-400'
                              } ${isCurrent ? 'ring-4 ring-[#E4232C]/20 text-[#E4232C] bg-[#14232E]' : ''}`}
                            >
                              <Icon size={18} />
                            </div>
                            <div className="sm:hidden">
                              <h4 className={`text-xs font-bold ${isCompleted ? 'text-[#14232E]' : 'text-slate-400'}`}>
                                {step.title}
                              </h4>
                              <p className="text-[11px] text-slate-500">{step.description}</p>
                            </div>
                          </div>

                          <div className="hidden sm:block">
                            <h4 className={`text-xs font-bold ${isCompleted ? 'text-[#14232E]' : 'text-slate-400'}`}>
                              {step.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700">
                  This order was cancelled. Any charged amounts have been credited or inventory restored.
                </div>
              )}

              {/* Courier Tracking Summary Bar */}
              <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-4 text-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">COURIER PARTNER</span>
                  <strong className="text-sm text-[#14232E]">{courierName}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">TRACKING NUMBER</span>
                  <span className="text-sm font-mono font-bold text-[#14232E]">{trackingNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">ESTIMATED DELIVERY</span>
                  <strong className="text-sm text-emerald-600">{estimatedDelivery}</strong>
                </div>
              </div>
            </div>

            {/* 3. Prescription Details Card (if applicable) */}
            {order.prescription?.hasPrescription && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-emerald-600" size={18} />
                    <h3 className="text-sm font-bold text-[#14232E]">
                      Verified Optical Prescription Details
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {order.prescription.lensPackage || 'Optical Lab Custom Lens'}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100">
                        <th className="pb-2 font-semibold">Eye</th>
                        <th className="pb-2 font-semibold">Sphere (SPH)</th>
                        <th className="pb-2 font-semibold">Cylinder (CYL)</th>
                        <th className="pb-2 font-semibold">Axis</th>
                        <th className="pb-2 font-semibold">Pupillary Distance (PD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      <tr>
                        <td className="py-2.5 font-bold text-[#14232E]">Right Eye (OD)</td>
                        <td className="py-2.5 font-mono">{order.prescription.rightEye?.sph || '0.00'}</td>
                        <td className="py-2.5 font-mono">{order.prescription.rightEye?.cyl || '0.00'}</td>
                        <td className="py-2.5 font-mono">{order.prescription.rightEye?.axis || '-'}</td>
                        <td className="py-2.5" rowSpan={2}>{order.prescription.pd || '63 mm'}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-[#14232E]">Left Eye (OS)</td>
                        <td className="py-2.5 font-mono">{order.prescription.leftEye?.sph || '0.00'}</td>
                        <td className="py-2.5 font-mono">{order.prescription.leftEye?.cyl || '0.00'}</td>
                        <td className="py-2.5 font-mono">{order.prescription.leftEye?.axis || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. Ordered Items Breakdown & Shipping Info (2 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Items List (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-[#14232E] border-b border-slate-100 pb-3">
                  Items Ordered ({order.items?.length || 0})
                </h3>

                <div className="divide-y divide-slate-100">
                  {order.items?.map((item, idx) => {
                    const itemImg =
                      item.image ||
                      item.product?.images?.front ||
                      item.product?.colors?.[0]?.images?.front ||
                      item.product?.primaryImage ||
                      '';
                    const unitPrice = Number(item.unitPrice || item.product?.price || 0);
                    const qty = item.quantity || 1;
                    const itemTotalPrice = Number(item.totalPrice || unitPrice * qty);

                    return (
                      <div key={idx} className="py-4 flex items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-12 bg-slate-50 border border-slate-200 rounded-lg p-1 flex items-center justify-center shrink-0">
                            {itemImg ? (
                              <img
                                src={itemImg}
                                alt={item.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            ) : (
                              <Package className="text-slate-300" size={20} />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#14232E] text-xs sm:text-sm">{item.name}</h4>
                            <p className="text-[11px] text-slate-400">
                              {item.brand || 'The Lens Hut'} · Color: {item.selectedColor || 'Standard'} · Size: {item.selectedSize || 'Standard'}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Qty: <strong className="text-slate-700">{qty}</strong> × ₹{unitPrice.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-[#14232E] text-xs sm:text-sm tabular-nums">
                            ₹{itemTotalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary & Shipping (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Delivery Address */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                    <MapPin size={16} className="text-slate-400" />
                    <h3 className="text-xs font-bold text-[#14232E]">Delivery Address</h3>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <p className="font-bold text-[#14232E]">{order.shippingAddress?.fullName}</p>
                    <p>{order.shippingAddress?.street}</p>
                    {order.shippingAddress?.locality && <p>{order.shippingAddress.locality}</p>}
                    <p>
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                    </p>
                    <p className="text-slate-500 pt-1 font-medium">Phone: {order.shippingAddress?.phone}</p>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3 text-xs">
                  <h3 className="text-xs font-bold text-[#14232E] border-b border-slate-100 pb-2.5">
                    Payment Summary
                  </h3>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-800">
                        ₹{Number(order.subtotal || orderTotal).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {Number(order.discountAmount || order.discount || 0) > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                        <span>-₹{Number(order.discountAmount || order.discount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span className="font-semibold text-slate-800">
                        {Number(order.shippingFee || order.shipping || 0) === 0 ? 'FREE' : `₹${Number(order.shippingFee || order.shipping).toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-extrabold text-[#14232E]">
                      <span>Total Paid</span>
                      <span className="text-[#E4232C]">₹{orderTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;