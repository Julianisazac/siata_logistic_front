import { useEffect, useState } from 'react';
import api from '../../api/axios';

interface Client { id: number; name: string; }
interface Product { id: number; name: string; }
interface Warehouse { id: number; name: string; }
interface Port { id: number; name: string; }

interface Shipment {
  id: number;
  tracking_number: string;
  shipment_type: string;
  quantity: number;
  price: number;
  discount: number;
  total_price: number;
  register_date: string;
  delivery_date: string;
  client: string;
  product: string;
  vehicle_plate?: string;
  warehouse?: string;
  fleet_number?: string;
  port?: string;
}

const landForm = {
  client_id: '',
  product_id: '',
  quantity: '',
  price: '',
  warehouse_id: '',
  vehicle_plate: '',
  delivery_date: '',
};

const seaForm = {
  client_id: '',
  product_id: '',
  quantity: '',
  price: '',
  port_id: '',
  fleet_number: '',
  delivery_date: '',
};

function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [ports, setPorts] = useState<Port[]>([]);
  const [type, setType] = useState<'land' | 'sea'>('land');
  const [formLand, setFormLand] = useState(landForm);
  const [formSea, setFormSea] = useState(seaForm);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    const [s, c, p, w, po] = await Promise.all([
      api.get('/shipments'),
      api.get('/clients'),
      api.get('/products'),
      api.get('/warehouses'),
      api.get('/ports'),
    ]);
    setShipments(s.data);
    setClients(c.data);
    setProducts(p.data);
    setWarehouses(w.data);
    setPorts(po.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (type === 'land') {
        await api.post('/shipments/land', {
          ...formLand,
          client_id: +formLand.client_id,
          product_id: +formLand.product_id,
          quantity: +formLand.quantity,
          price: +formLand.price,
          warehouse_id: +formLand.warehouse_id,
        });
        setFormLand(landForm);
      } else {
        await api.post('/shipments/sea', {
          ...formSea,
          client_id: +formSea.client_id,
          product_id: +formSea.product_id,
          quantity: +formSea.quantity,
          price: +formSea.price,
          port_id: +formSea.port_id,
        });
        setFormSea(seaForm);
      }
      fetchAll();
    } catch (err: any) {
      setError(err.response?.data?.message?.message || 'Error al crear envío');
    }
  };

  return (
    <div>
      <h2>Envíos</h2>

      <form onSubmit={handleSubmit}>
        <h3>Nuevo Envío</h3>
        {error && <p className="error">{error}</p>}

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <button
            type="button"
            className={type === 'land' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setType('land')}
          >
            Terrestre
          </button>
          <button
            type="button"
            className={type === 'sea' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setType('sea')}
          >
            Marítimo
          </button>
        </div>

        <select
          value={type === 'land' ? formLand.client_id : formSea.client_id}
          onChange={e => type === 'land'
            ? setFormLand({ ...formLand, client_id: e.target.value })
            : setFormSea({ ...formSea, client_id: e.target.value })}
          required
        >
          <option value="">Selecciona un cliente</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select
          value={type === 'land' ? formLand.product_id : formSea.product_id}
          onChange={e => type === 'land'
            ? setFormLand({ ...formLand, product_id: e.target.value })
            : setFormSea({ ...formSea, product_id: e.target.value })}
          required
        >
          <option value="">Selecciona un producto</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <input
          placeholder="Cantidad"
          type="number"
          min={1}
          value={type === 'land' ? formLand.quantity : formSea.quantity}
          onChange={e => type === 'land'
            ? setFormLand({ ...formLand, quantity: e.target.value })
            : setFormSea({ ...formSea, quantity: e.target.value })}
          required
        />

        <input
          placeholder="Precio unitario"
          type="number"
          min={0}
          value={type === 'land' ? formLand.price : formSea.price}
          onChange={e => type === 'land'
            ? setFormLand({ ...formLand, price: e.target.value })
            : setFormSea({ ...formSea, price: e.target.value })}
          required
        />

        <input
          placeholder="Fecha de entrega"
          type="date"
          value={type === 'land' ? formLand.delivery_date : formSea.delivery_date}
          onChange={e => type === 'land'
            ? setFormLand({ ...formLand, delivery_date: e.target.value })
            : setFormSea({ ...formSea, delivery_date: e.target.value })}
          required
        />

        {type === 'land' && (
          <>
            <select
              value={formLand.warehouse_id}
              onChange={e => setFormLand({ ...formLand, warehouse_id: e.target.value })}
              required
            >
              <option value="">Selecciona una bodega</option>
              {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
            <input
              placeholder="Placa del vehículo (ej. ABC123)"
              value={formLand.vehicle_plate}
              onChange={e => setFormLand({ ...formLand, vehicle_plate: e.target.value })}
              required
            />
          </>
        )}

        {type === 'sea' && (
          <>
            <select
              value={formSea.port_id}
              onChange={e => setFormSea({ ...formSea, port_id: e.target.value })}
              required
            >
              <option value="">Selecciona un puerto</option>
              {ports.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <input
              placeholder="Número de flota (ej. ABC1234D)"
              value={formSea.fleet_number}
              onChange={e => setFormSea({ ...formSea, fleet_number: e.target.value })}
              required
            />
          </>
        )}

        <div style={{ marginTop: '0.5rem' }}>
          <button type="submit" className="btn-primary">Crear Envío</button>
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Tracking</th>
            <th>Tipo</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Descuento</th>
            <th>Total</th>
            <th>Entrega</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map(s => (
            <tr key={s.id}>
              <td>{s.tracking_number}</td>
              <td>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  background: s.shipment_type === 'LAND' ? '#dbeafe' : '#dcfce7',
                  color: s.shipment_type === 'LAND' ? '#1d4ed8' : '#15803d',
                }}>
                  {s.shipment_type === 'LAND' ? 'Terrestre' : 'Marítimo'}
                </span>
              </td>
              <td>{s.client}</td>
              <td>{s.product}</td>
              <td>{s.quantity}</td>
              <td>${s.discount}</td>
              <td>${s.total_price}</td>
              <td>{new Date(s.delivery_date).toLocaleDateString()}</td>
              <td>
                {s.shipment_type === 'LAND'
                  ? `${s.vehicle_plate} - ${s.warehouse}`
                  : `${s.fleet_number} - ${s.port}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentsPage;