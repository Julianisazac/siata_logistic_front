import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '1rem 2rem',
      borderRadius: '8px',
      background: type === 'success' ? '#dcfce7' : '#fee2e2',
      color: type === 'success' ? '#15803d' : '#dc2626',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontSize: '0.95rem',
      fontWeight: 500,
      zIndex: 1000,
      whiteSpace: 'nowrap',
    }}>
      {type === 'success' ? '✅' : '❌'} {message}
    </div>
  );
}

export default Toast;