import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
const AuthContext = createContext(undefined);
const INITIAL_USER = {
  id: 'usr-tlh-101',
  name: 'Saiteja',
  email: 'saiteja@gmail.com',
  phone: '+91 98765 43210',
  joinedDate: 'May 2025',
  avatar: '/images/home/promo-sunglasses-man.png',
  addresses: [{
    id: 'addr-01',
    fullName: 'Saiteja',
    phone: '+91 98765 43210',
    street: 'H.No 12-5-67, Collectorate Road',
    locality: 'Mankammathota',
    city: 'Karimnagar',
    state: 'Telangana',
    pincode: '505001',
    isDefault: true
  }, {
    id: 'addr-02',
    fullName: 'Saiteja (Office)',
    phone: '+91 98765 43210',
    street: 'Plot 45, Tech Zone',
    locality: 'Hitech City',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    isDefault: false
  }]
};
const INITIAL_ORDERS = [{
  id: '#LH10256',
  date: '12 Jun 2025',
  itemCountText: '1 item',
  items: [{
    product: PRODUCTS[0],
    quantity: 1,
    selectedColor: 'Blue',
    selectedSize: 'Medium'
  }],
  subtotal: 2999,
  discount: 0,
  shipping: 0,
  total: 2999,
  status: 'Delivered',
  paymentMethod: 'UPI / QR',
  shippingAddress: INITIAL_USER.addresses[0],
  estimatedDelivery: '16 Jun 2025',
  trackingNumber: 'LH-EXP-89021'
}, {
  id: '#LH10248',
  date: '05 Jun 2025',
  itemCountText: '1 item',
  items: [{
    product: PRODUCTS[4] || PRODUCTS[1],
    quantity: 1,
    selectedColor: 'Gold',
    selectedSize: 'Medium'
  }],
  subtotal: 4499,
  discount: 0,
  shipping: 0,
  total: 4499,
  status: 'Delivered',
  paymentMethod: 'Credit / Debit Card',
  shippingAddress: INITIAL_USER.addresses[0],
  estimatedDelivery: '09 Jun 2025',
  trackingNumber: 'LH-EXP-77612'
}, {
  id: '#LH10232',
  date: '28 May 2025',
  itemCountText: '2 items',
  items: [{
    product: PRODUCTS[2] || PRODUCTS[0],
    quantity: 2,
    selectedColor: 'Clear',
    selectedSize: 'Standard'
  }],
  subtotal: 2598,
  discount: 0,
  shipping: 0,
  total: 2598,
  status: 'Processing',
  paymentMethod: 'UPI / QR',
  shippingAddress: INITIAL_USER.addresses[0],
  estimatedDelivery: '02 Jun 2025',
  trackingNumber: 'LH-EXP-65410'
}, {
  id: '#LH10221',
  date: '20 May 2025',
  itemCountText: '1 item',
  items: [{
    product: PRODUCTS[1] || PRODUCTS[0],
    quantity: 1,
    selectedColor: 'Tortoise',
    selectedSize: 'Medium'
  }],
  subtotal: 3799,
  discount: 0,
  shipping: 0,
  total: 3799,
  status: 'Shipped',
  paymentMethod: 'UPI / QR',
  shippingAddress: INITIAL_USER.addresses[0],
  estimatedDelivery: '25 May 2025',
  trackingNumber: 'LH-EXP-54329'
}, {
  id: '#LH10205',
  date: '10 May 2025',
  itemCountText: '1 item',
  items: [{
    product: PRODUCTS[3] || PRODUCTS[0],
    quantity: 1,
    selectedColor: 'Matte Black',
    selectedSize: 'Wide'
  }],
  subtotal: 4199,
  discount: 0,
  shipping: 0,
  total: 4199,
  status: 'Delivered',
  paymentMethod: 'Cash on Delivery',
  shippingAddress: INITIAL_USER.addresses[0],
  estimatedDelivery: '14 May 2025',
  trackingNumber: 'LH-EXP-43218'
}];
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
  const login = async (email, _password, _rememberMe = true) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setIsLoading(false);
    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: 'Please enter a valid email address.'
      };
    }
    const loggedInUser = {
      id: user?.id || 'usr-' + Date.now(),
      name: user?.email === email ? user.name : email.split('@')[0],
      email: email,
      phone: user?.phone || '+91 98000 00000',
      joinedDate: 'Joined March 2026',
      addresses: user?.addresses || INITIAL_USER.addresses
    };
    setUser(loggedInUser);
    return {
      success: true
    };
  };
  const signup = async data => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setIsLoading(false);
    if (!data.name || !data.email || !data.password) {
      return {
        success: false,
        error: 'All mandatory fields are required.'
      };
    }
    if (data.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long.'
      };
    }
    const newUser = {
      id: 'usr-' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      joinedDate: 'Joined Today',
      addresses: []
    };
    setUser(newUser);
    return {
      success: true
    };
  };
  const logout = () => {
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
  const placeOrder = orderData => {
    const newOrder = {
      id: 'TLH-2026-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      shipping: orderData.shipping,
      total: orderData.total,
      status: 'Placed',
      paymentMethod: orderData.paymentMethod,
      shippingAddress: orderData.shippingAddress,
      estimatedDelivery: 'Within 3–5 Business Days',
      trackingNumber: 'TLH-EXP-' + Math.floor(100000 + Math.random() * 900000)
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    orders,
    login,
    signup,
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