import { useEffect, useState } from 'react';
import api from '../../api/axios';

interface Port {id: number;name: string;city: string;country: string;}

function PortsPage() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [form, setForm] = useState({ name: '', city: '', country: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchPorts = async () => {
    const res = await api.get('/ports');
    setPorts(res.data);
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/ports/${editingId}`, form);
      } else {
        await api.post('/ports', form);
      }
      setForm({ name: '', city: '', country: '' });
      setEditingId(null);
      fetchPorts();
    } catch (err: any) {
      setError(err.response?.data?.message?.message || 'Error al guardar');
    }
  };

  const handleEdit = (port: Port) => {
    setEditingId(port.id);
    setForm({ name: port.name, city: port.city, country: port.country });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este puerto?')) return;
    await api.delete(`/ports/${id}`);
    fetchPorts();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', city: '', country: '' });
    setError('');
  };

  return (
    <div>
      <h2>Puertos</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editingId ? 'Editar Puerto' : 'Nuevo Puerto'}</h3>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Ciudad"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
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
            <th>Ciudad</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ports.map(port => (
            <tr key={port.id}>
              <td>{port.name}</td>
              <td>{port.city}</td>
              <td>{port.country}</td>
              <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-edit" onClick={() => handleEdit(port)}>Editar</button>
                <button className="btn-danger" onClick={() => handleDelete(port.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortsPage;