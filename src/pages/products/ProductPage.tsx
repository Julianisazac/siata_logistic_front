import { useEffect, useState } from 'react';
import api from '../../api/axios';

interface Product {id: number;name: string;description: string;}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
      } else {
        await api.post('/products', form);
      }
      setForm({ name: '', description: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message?.message || 'Error al guardar');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({ name: product.name, description: product.description });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', description: '' });
    setError('');
  };

  return (
    <div>
      <h2>Productos</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Descripción"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
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
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-edit" onClick={() => handleEdit(product)}>Editar</button>
                <button className="btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;