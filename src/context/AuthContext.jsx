import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';
import { orderApi } from '../services/orderApi';
const AuthContext = createContext(undefined);
export const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tlh_auth_user');
      return saved ? JSON.parse(saved) : null;
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

  // Sync user orders from backend whenever user is authenticated
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        try {
          const res = await orderApi.getMyOrders();
          if (res.success && Array.isArray(res.data)) {
            setOrders(res.data);
          }
        } catch (err) {
          console.warn('[AuthContext] Failed to sync orders from backend:', err);
        }
      }
    };
    fetchUserOrders();
  }, [user]);

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
        joinedDate: apiUser.createdAt ? new Date(apiUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
        avatar: apiUser.avatar || '',
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
        joinedDate: apiUser.createdAt ? new Date(apiUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
        avatar: apiUser.avatar || '',
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
  const placeOrder = async (orderData) => {
    const apiResponse = await orderApi.createOrder(orderData);
    if (apiResponse?.success && apiResponse?.data) {
      const serverOrder = apiResponse.data;
      const normalizedOrder = {
        ...serverOrder,
        id: serverOrder._id || serverOrder.id || serverOrder.orderNumber,
        date: new Date(serverOrder.createdAt || serverOrder.orderDate || Date.now()).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
      };

      setOrders((prev) => [normalizedOrder, ...prev]);
      return normalizedOrder;
    }

    throw new Error(apiResponse?.message || 'Failed to place order on server.');
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