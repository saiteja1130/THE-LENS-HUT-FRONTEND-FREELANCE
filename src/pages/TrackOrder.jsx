import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ID-based search tracking has been simplified per user request.
 * All order tracking and status updates are displayed directly in the user's
 * Order History & Order Details dashboard without needing manual ID inputs.
 */
export const TrackOrder = () => {
  return <Navigate to="/account?tab=orders" replace />;
};