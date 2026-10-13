import { api } from './api';

export const authApi = {
  /**
   * User Signup
   */
  signup: async ({ fullName, email, phone, password, confirmPassword }) => {
    try {
      return await api.post('/auth/signup', {
        fullName,
        email,
        phone,
        password,
        confirmPassword,
      });
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
   * Verify Email with 6-digit OTP
   */
  verifyEmail: async ({ email, otp }) => {
    try {
      return await api.post('/auth/verify-email', { email, otp });
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
      return await api.post('/auth/resend-verification', { email });
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
      return await api.post('/auth/login', { email, password });
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
      return await api.post('/auth/request-otp', { email });
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
      return await api.post('/auth/verify-otp', { email, otp });
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
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
      return await api.get('/auth/me', config);
    } catch (err) {
      return {
        success: false,
        message: 'Network error: Unable to fetch profile.',
        errorCode: 'NETWORK_ERROR',
      };
    }
  },
};

export default authApi;
