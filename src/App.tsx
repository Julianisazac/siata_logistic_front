import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import ClientsPage from './pages/clients/ClientsPage';
import ProductsPage from './pages/products/ProductPage';
import WarehousesPage from './pages/warehouses/WarehousesPage';
import PortsPage from './pages/ports/PortsPage';
import ShipmentsPage from './pages/shipments/ShipmentsPage';
import LoginPage from './pages/auth/LoginPage';

function PrivateRoute({ children, isAuth }: { children: React.ReactElement, isAuth: boolean }) {
  return isAuth ? children : <Navigate to="/login" />;
}

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <BrowserRouter>
      {isAuth && (
        <nav>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/clients">Clientes</NavLink>
          <NavLink to="/products">Productos</NavLink>
          <NavLink to="/warehouses">Bodegas</NavLink>
          <NavLink to="/ports">Puertos</NavLink>
          <NavLink to="/shipments">Envíos</NavLink>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              padding: '0.3rem 0.8rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Cerrar sesión
          </button>
        </nav>
      )}

      <div className={isAuth ? 'page-container' : ''}>
        <Routes>
          <Route path="/login" element={
            isAuth ? <Navigate to="/" /> : <LoginPage onLogin={() => setIsAuth(true)} />
          } />
          <Route path="/" element={
            <PrivateRoute isAuth={isAuth}>
              <h1>Bienvenido a SIATA Logistics</h1>
            </PrivateRoute>
          } />
          <Route path="/clients" element={
            <PrivateRoute isAuth={isAuth}><ClientsPage /></PrivateRoute>
          } />
          <Route path="/products" element={
            <PrivateRoute isAuth={isAuth}><ProductsPage /></PrivateRoute>
          } />
          <Route path="/warehouses" element={
            <PrivateRoute isAuth={isAuth}><WarehousesPage /></PrivateRoute>
          } />
          <Route path="/ports" element={
            <PrivateRoute isAuth={isAuth}><PortsPage /></PrivateRoute>
          } />
          <Route path="/shipments" element={
            <PrivateRoute isAuth={isAuth}><ShipmentsPage /></PrivateRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;