import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/custom.css';
import AppRoutes from './routes/AppRoutes.tsx';
import { Toaster } from './components/ui/toaster.tsx'
import { ErrorProvider } from './context/ErrorContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <NotificationProvider>
  <ErrorProvider>
    <Toaster />
    <AppRoutes />
  </ErrorProvider>
  // </NotificationProvider>,
)
