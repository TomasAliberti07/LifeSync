import React from 'react';
import '../styles/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="ui-button"
    >
      {loading ? 'Procesando...' : children}
    </button>
  );
};