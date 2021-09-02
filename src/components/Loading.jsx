import React from 'react';
import logo from '../images/logo.svg';
import './loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="logo-container">
        <img src={ logo } className="load-logo" alt="logo" />
      </div>
    </div>
  );
}
