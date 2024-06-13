import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerForm from '@/features/customers/components/CustomerForm';
import CustomerPage from '../pages/CustomerPage';

const CustomerRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomerPage />} />
    <Route path="/new" element={<CustomerForm onClose={() => { }} />} />
    <Route path="/:id/edit" element={<CustomerForm onClose={() => { }} />} />
  </Routes>
);

export default CustomerRoutes;
