import React, { useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

interface RegisterProps {
  onBackToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onBackToLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axiosClient.post('/auth/register', {
        usuario,
        contrasena,
      });

      setSuccess('¡Usuario creado con éxito! Ya puedes iniciar sesión.');
      setTimeout(() => {
        onBackToLogin();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <p className="eyebrow">lifeSync Setup</p>
      <h2 className="login-title">Crear Usuario</h2>

      <form onSubmit={handleRegister} className="login-form">
        <Input
          label="Nuevo Usuario"
          type="text"
          placeholder="Elige un usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}
        {success && (
          <p style={{ color: 'var(--accent)', fontSize: '13px', textAlign: 'center', margin: 0 }}>
            {success}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Registrar Cuenta
        </Button>

        <button
          type="button"
          onClick={onBackToLogin}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--muted)',
            cursor: 'pointer',
            fontSize: '13px',
            marginTop: '8px',
            textDecoration: 'underline'
          }}
        >
          ← Volver al Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Register;