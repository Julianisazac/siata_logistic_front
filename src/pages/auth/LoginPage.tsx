import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await api.post('/auth/register', form);
        setIsRegister(false);
        setError('');
        alert('Usuario registrado! Ahora inicia sesión.');
      } else {
        const res = await api.post('/auth/login', form);
        localStorage.setItem('token', res.data.access_token);
        onLogin();
        navigate('/');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(typeof msg === 'string' ? msg : msg?.message || 'Error al procesar');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f1f5f9',
    }}>
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#1e293b' }}>
          SIATA Logistics
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {isRegister ? 'Crear cuenta nueva' : 'Inicia sesión para continuar'}
        </p>

        {error && <p className="error" style={{ marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ boxShadow: 'none', padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
              {isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;