import React from 'react';
import Error from '../images/Error.gif';
import './Erro.css';

export default function Erro() {
  return (
    <div className="error-section">
      <h1>Not Found</h1>
      <h3>Que tal pedir uma pizza?</h3>
      <img src={ Error } alt="Error gif" />
    </div>
  );
}
