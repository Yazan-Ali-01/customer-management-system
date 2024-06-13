import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import NotFound from '@/components/NotFound';

const AuthRoutes = lazy(() => import('@/features/auth/routes/AuthRoutes'));
const CustomerRoutes = lazy(() => import('@/features/customers/routes/CustomerRoutes'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));

const AppRoutes: React.FC = () => (
  <Router>
    <Suspense fallback={<div className="flex justify-center items-center h-96">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary"></div>
    </div>}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/customers" element={<CustomerRoutes />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
