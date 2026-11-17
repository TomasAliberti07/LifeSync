import React from 'react';
import '../styles/Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="ui-input-group">
      <label className="ui-input-label">{label}</label>
      <input {...props} className="ui-input-field" />
    </div>
  );
};