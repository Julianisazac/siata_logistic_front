import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface Warehouse {id: number; name: string; location: string; country: string;}
 

function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [form, setForm] = useState({ name: '', location: '', country: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const fetchWarehouses = async () => {
    const res = await api.get('/warehouses');
    setWarehouses(res.data);
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/warehouses/${editingId}`, form);
        setToast({ message: 'Bodega actualizada correctamente', type: 'success' });
      } else {
        await api.post('/warehouses', form);
        setToast({ message: 'Bodega creada correctamente', type: 'success' });
      }
      setForm({ name: '', location: '', country: '' });
      setEditingId(null);
      fetchWarehouses();
    } catch (err: any) {
      setError(err.response?.data?.message?.message || 'Error al guardar');
    }
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingId(warehouse.id);
    setForm({ name: warehouse.name, location: warehouse.location, country: warehouse.country });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmId) return;
    try {
      await api.delete(`/warehouses/${confirmId}`);
      setToast({ message: 'Bodega eliminada correctamente', type: 'success' });
      fetchWarehouses();
    } catch {
      setToast({ message: 'Error al eliminar', type: 'error' });
    } finally {
      setConfirmId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', location: '', country: '' });
    setError('');
  };

  return (
    <div>
      <h2>Bodegas</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editingId ? 'Editar Bodega' : 'Nueva Bodega'}</h3>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Ubicación"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="País"
          value={form.country}
          onChange={e => setForm({ ...form, country: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button type="submit" className="btn-primary">
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(warehouse => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.location}</td>
              <td>{warehouse.country}</td>
              <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-edit" onClick={() => handleEdit(warehouse)}>Editar</button>
                <button className="btn-danger" onClick={() => setConfirmId(warehouse.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmId && (
        <ConfirmModal
          message="¿Estás seguro de eliminar esta bodega?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default WarehousesPage;