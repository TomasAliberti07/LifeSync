import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './feactures/Login/Login';
import { DashboardPage } from './pages/DashboardPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública de Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta principal / Dashboard protegida */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />

        {/* Redirección por defecto a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;