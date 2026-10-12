const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Handle API responses and standardize validation errors
 */
const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch {
    data = { success: false, message: 'Server communication error' };
  }

  if (!response.ok) {
    const errorObj = {
      success: false,
      status: response.status,
      message: data.message || 'An error occurred. Please try again.',
      errorCode: data.errorCode || 'UNKNOWN_ERROR',
      errors: data.errors || {},
      data: data.data || null,
    };
    return errorObj;
  }

  return data;
};

export const authApi = {
  /**
   * User Signup
   */
  signup: async ({ fullName, email, phone, password, confirmPassword }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, password, confirmPassword }),
      });
      return await handleResponse(response);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to connect to server. Ensure backend is running.',
        errorCode: 'NETWORK_ERROR',
        errors: {},
      };
    }
  },

  /**
   * Verify Email with 6-digit OTP
   */
  verifyEmail: async ({ email, otp }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      return await handleResponse(response);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to connect to server.',
        errorCode: 'NETWORK_ERROR',
        errors: {},
      };
    }
  },

  /**
   * Resend Verification OTP
   */
  resendVerificationOTP: async ({ email }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to connect to server.',
        errorCode: 'NETWORK_ERROR',
        errors: {},
      };
    }
  },

  /**
   * Login with Email & Password
   */
  loginWithPassword: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await handleResponse(response);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to connect to server.',
        errorCode: 'NETWORK_ERROR',
        errors: {},
      };
    }
  },

  /**
   * Request Login OTP (Passwordless)
   */
  requestLoginOTP: async ({ email }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to connect to server.',
        errorCode: 'NETWORK_ERROR',
        errors: {},
      };
    }
  },

  /**
   * Verify Login OTP
   */
  verifyLoginOTP: async ({ email, otp }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      return await handleResponse(response);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to connect to server.',
        errorCode: 'NETWORK_ERROR',
        errors: {},
      };
    }
  },

  /**
   * Get Current User Profile
   */
  getMe: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return await handleResponse(response);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to fetch profile.',
        errorCode: 'NETWORK_ERROR',
      };
    }
  },
};
