import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface Product {
    id: number; name: string; description: string;
}

function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [confirmId, setConfirmId] = useState<number | null>(null);

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
                setToast({ message: 'Producto actualizado correctamente', type: 'success' });
            } else {
                await api.post('/products', form);
                setToast({ message: 'Producto creado correctamente', type: 'success' });
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

    const handleDeleteConfirm = async () => {
        if (!confirmId) return;
        try {
            await api.delete(`/products/${confirmId}`);
            setToast({ message: 'Producto eliminado correctamente', type: 'success' });
            fetchProducts();
        } catch {
            setToast({ message: 'Error al eliminar', type: 'error' });
        } finally {
            setConfirmId(null);
        }
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
                                <button className="btn-danger" onClick={() => setConfirmId(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {confirmId && (
                <ConfirmModal
                    message="¿Estás seguro de eliminar este producto?"
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

export default ProductsPage;