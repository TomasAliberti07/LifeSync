import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../api/axiosClient';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Register } from './Registar';
import { 
  FiCalendar, 
  FiEdit3, 
  FiCheckSquare, 
  FiClock, 
  FiFolder, 
  FiTrendingUp 
} from 'react-icons/fi';
import '../../styles/Login.css';

export const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosClient.post('/auth/login', {
        usuario,
        contrasena,
      });

      // Guardamos el token de acceso y redirigimos al Dashboard
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Íconos flotantes animados de fondo */}
      <div className="bg-floating-icon icon-pos-1"><FiCalendar /></div>
      <div className="bg-floating-icon icon-pos-2"><FiEdit3 /></div>
      <div className="bg-floating-icon icon-pos-3"><FiCheckSquare /></div>
      <div className="bg-floating-icon icon-pos-4"><FiClock /></div>
      <div className="bg-floating-icon icon-pos-5"><FiFolder /></div>
      <div className="bg-floating-icon icon-pos-6"><FiTrendingUp /></div>

      {/* Título principal con brillo sutil */}
      <h1 className="login-main-brand">
        life<span>Sync</span>
      </h1>

      {/* Si isRegistering es true muestra Registrar, sino muestra el Login */}
      {isRegistering ? (
        <Register onBackToLogin={() => setIsRegistering(false)} />
      ) : (
        <div className="login-card">
          <p className="eyebrow">Acceso al Sistema</p>
          <h2 className="login-title">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Usuario"
              type="text"
              placeholder="Ingresa tu usuario"
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

            <Button type="submit" loading={loading}>
              Entrar a lifeSync
            </Button>

            {/* Botón temporal para ir a crear usuario */}
            <button
              type="button"
              onClick={() => setIsRegistering(true)}
              style={{
                background: 'transparent',
                border: '1px dashed var(--line)',
                borderRadius: '8px',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: '13px',
                padding: '10px',
                marginTop: '12px',
                transition: 'all 0.2s'
              }}
            >
              🛠️ [Temporal] Crear nuevo usuario
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;