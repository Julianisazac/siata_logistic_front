import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ClientsPage from './pages/clients/ClientsPage';
import ProductsPage from './pages/products/ProductPage';
import WarehousesPage from './pages/warehouses/WarehousesPage';
import PortsPage from './pages/ports/PortsPage';
import ShipmentsPage from './pages/shipments/ShipmentsPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/clients">Clientes</NavLink>
        <NavLink to="/products">Productos</NavLink>
        <NavLink to="/warehouses">Bodegas</NavLink>
        <NavLink to="/ports">Puertos</NavLink>
        <NavLink to="/shipments">Envíos</NavLink>
      </nav>

      <div className="page-container">
        <Routes>
          <Route path="/" element={<h1>Bienvenido a SIATA Logistics</h1>} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/warehouses" element={<WarehousesPage />} />
          <Route path="/ports" element={<PortsPage />} />
          <Route path="/shipments" element={<ShipmentsPage />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

