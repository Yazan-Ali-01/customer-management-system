import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');

  const isTokenExpired = (token: string) => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      if (exp * 1000 < Date.now()) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  };

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
