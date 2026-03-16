import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface Client {id: number;name: string;email: string;phone: string;}

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const fetchClients = async () => {
    const res = await api.get('/clients');
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/clients/${editingId}`, form);
        setToast({ message: 'Cliente actualizado correctamente', type: 'success' });
      } else {
        await api.post('/clients', form);
        setToast({ message: 'Cliente creado correctamente', type: 'success' });
      }
      setForm({ name: '', email: '', phone: '' });
      setEditingId(null);
      fetchClients();
    } catch (err: any) {
      setError(err.response?.data?.message?.message || 'Error al guardar');
    }
  };

  const handleEdit = (client: Client) => {
    setEditingId(client.id);
    setForm({ name: client.name, email: client.email, phone: client.phone });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmId) return;
    try {
      await api.delete(`/clients/${confirmId}`);
      setToast({ message: 'Cliente eliminado correctamente', type: 'success' });
      fetchClients();
    } catch {
      setToast({ message: 'Error al eliminar', type: 'error' });
    } finally {
      setConfirmId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', email: '', phone: '' });
    setError('');
  };

  return (
    <div>
      <h2>Clientes</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editingId ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Teléfono"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
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
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-edit" onClick={() => handleEdit(client)}>Editar</button>
                <button className="btn-danger" onClick={() => setConfirmId(client.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmId && (
        <ConfirmModal
          message="¿Estás seguro de eliminar este cliente?"
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

export default ClientsPage;