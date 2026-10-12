import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';
const AuthContext = createContext(undefined);
export const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tlh_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'usr-tlh-101' || parsed.email === 'saiteja@gmail.com' || parsed.name === 'Aarav Sharma') {
          localStorage.removeItem('tlh_auth_user');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('tlh_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('tlh_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('tlh_auth_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('tlh_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Login with Email & Password
  const login = async (email, password, rememberMe = true) => {
    setIsLoading(true);
    const res = await authApi.loginWithPassword({ email, password });
    setIsLoading(false);

    if (res.success && res.data) {
      const { token, user: apiUser } = res.data;
      const normalizedUser = {
        id: apiUser.id,
        name: apiUser.fullName,
        email: apiUser.email,
        phone: apiUser.phone || '',
        role: apiUser.role,
        isEmailVerified: apiUser.isEmailVerified,
        joinedDate: apiUser.createdAt ? new Date(apiUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently',
        avatar: apiUser.avatar || '',
        addresses: apiUser.addresses || [],
      };
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('thelenshut_auth_token', token);
      setUser(normalizedUser);
      return { success: true, user: normalizedUser };
    }

    return {
      success: false,
      error: res.message || 'Failed to sign in. Please check your credentials.',
      errorCode: res.errorCode,
      errors: res.errors || {},
      data: res.data,
    };
  };

  // Request Login OTP
  const requestLoginOTP = async (email) => {
    setIsLoading(true);
    const res = await authApi.requestLoginOTP({ email });
    setIsLoading(false);
    return res;
  };

  // Verify Login OTP
  const verifyLoginOTP = async (email, otp) => {
    setIsLoading(true);
    const res = await authApi.verifyLoginOTP({ email, otp });
    setIsLoading(false);

    if (res.success && res.data) {
      const { token, user: apiUser } = res.data;
      const normalizedUser = {
        id: apiUser.id,
        name: apiUser.fullName,
        email: apiUser.email,
        phone: apiUser.phone || '',
        role: apiUser.role,
        isEmailVerified: apiUser.isEmailVerified,
        joinedDate: 'Recently',
        avatar: apiUser.avatar || '',
        addresses: apiUser.addresses || [],
      };
      localStorage.setItem('thelenshut_auth_token', token);
      setUser(normalizedUser);
      return { success: true, user: normalizedUser };
    }

    return {
      success: false,
      error: res.message || 'Invalid login code.',
      errorCode: res.errorCode,
      errors: res.errors || {},
    };
  };

  // User Signup
  const signup = async (data) => {
    setIsLoading(true);
    const res = await authApi.signup({
      fullName: data.name,
      email: data.email,
      phone: data.phone || '',
      password: data.password,
      confirmPassword: data.confirmPassword || data.password,
    });
    setIsLoading(false);

    if (res.success) {
      return {
        success: true,
        message: res.message,
        requiresVerification: true,
        email: data.email,
      };
    }

    return {
      success: false,
      error: res.message || 'Failed to register account.',
      errorCode: res.errorCode,
      errors: res.errors || {},
    };
  };

  // Verify Email with 6-digit OTP
  const verifyEmail = async (email, otp) => {
    setIsLoading(true);
    const res = await authApi.verifyEmail({ email, otp });
    setIsLoading(false);

    if (res.success && res.data) {
      const { token, user: apiUser } = res.data;
      const normalizedUser = {
        id: apiUser.id,
        name: apiUser.fullName,
        email: apiUser.email,
        phone: apiUser.phone || '',
        role: apiUser.role,
        isEmailVerified: true,
        joinedDate: 'Recently',
        avatar: apiUser.avatar || '',
        addresses: apiUser.addresses || [],
      };
      localStorage.setItem('thelenshut_auth_token', token);
      setUser(normalizedUser);
      return { success: true, user: normalizedUser };
    }

    return {
      success: false,
      error: res.message || 'Failed to verify email.',
      errorCode: res.errorCode,
      errors: res.errors || {},
    };
  };

  // Resend Email Verification OTP
  const resendVerificationOTP = async (email) => {
    setIsLoading(true);
    const res = await authApi.resendVerificationOTP({ email });
    setIsLoading(false);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('thelenshut_auth_token');
    sessionStorage.removeItem('thelenshut_auth_token');
    setUser(null);
  };
  const forgotPassword = async email => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setIsLoading(false);
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Invalid email address.'
      };
    }
    return {
      success: true,
      message: `Password reset link has been dispatched to ${email}.`
    };
  };
  const resetPassword = async _password => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setIsLoading(false);
    return {
      success: true,
      message: 'Your password has been successfully reset. You can now login.'
    };
  };
  const updateProfile = data => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      ...data
    } : null);
  };
  const addAddress = address => {
    if (!user) return;
    const newAddr = {
      ...address,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0 ? true : address.isDefault
    };
    setUser(prev => {
      if (!prev) return null;
      let list = [...prev.addresses];
      if (newAddr.isDefault) {
        list = list.map(a => ({
          ...a,
          isDefault: false
        }));
      }
      return {
        ...prev,
        addresses: [...list, newAddr]
      };
    });
  };
  const updateAddress = (id, address) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.map(a => a.id === id ? {
          ...a,
          ...address
        } : a)
      };
    });
  };
  const deleteAddress = id => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.filter(a => a.id !== id)
      };
    });
  };
  const setDefaultAddress = id => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.map(a => ({
          ...a,
          isDefault: a.id === id
        }))
      };
    });
  };
  const placeOrder = (orderData) => {
    const orderNum = 'LH-2026-' + Math.floor(1000 + Math.random() * 9000);
    const nowIso = new Date().toISOString();

    // Build prescription snapshot if any eyeglasses item has prescription
    const firstEyeglassRx = orderData.items?.find((i) => i.configuration?.prescription?.od?.sph)?.configuration?.prescription;

    const newOrder = {
      id: orderNum,
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      orderDate: nowIso,
      customer: {
        id: user?.id || 'cust-guest',
        name: user?.name || orderData.shippingAddress?.fullName || 'Guest Customer',
        email: user?.email || 'customer@thelenshut.com',
        phone: user?.phone || orderData.shippingAddress?.phone || '+91 98765 00000'
      },
      itemCountText: `${orderData.items?.length || 1} item${orderData.items?.length > 1 ? 's' : ''}`,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      discountAmount: orderData.discount || 0,
      shipping: orderData.shipping,
      shippingFee: orderData.shipping || 0,
      total: orderData.total,
      totalAmount: orderData.total,
      status: 'Placed',
      orderStatus: 'Processing',
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: 'Paid',
      shippingAddress: orderData.shippingAddress || SAMPLE_SHIPPING_ADDRESS,
      estimatedDelivery: 'Within 3–5 Business Days',
      trackingNumber: 'LH-EXP-' + Math.floor(100000 + Math.random() * 900000),
      prescription: firstEyeglassRx ? {
        hasPrescription: true,
        rightEye: {
          sph: firstEyeglassRx.od?.sph || '0.00',
          cyl: firstEyeglassRx.od?.cyl || '0.00',
          axis: firstEyeglassRx.od?.axis || '-'
        },
        leftEye: {
          sph: firstEyeglassRx.os?.sph || '0.00',
          cyl: firstEyeglassRx.os?.cyl || '0.00',
          axis: firstEyeglassRx.os?.axis || '-'
        },
        pd: firstEyeglassRx.pd ? `${firstEyeglassRx.pd} mm` : '63 mm',
        lensPackage: orderData.items?.find((i) => i.configuration?.lensSelection?.lensName)?.configuration?.lensSelection?.lensName || 'Optical Lab Custom Lens'
      } : {
        hasPrescription: false
      }
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Sync to admin thelenshut_orders in localStorage
    try {
      const existing = localStorage.getItem('thelenshut_orders');
      const parsed = existing ? JSON.parse(existing) : [];
      localStorage.setItem('thelenshut_orders', JSON.stringify([newOrder, ...parsed]));
    } catch {
      // ignore
    }

    return newOrder;
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    orders,
    login,
    requestLoginOTP,
    verifyLoginOTP,
    signup,
    verifyEmail,
    resendVerificationOTP,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    placeOrder
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};