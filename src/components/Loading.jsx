import React from 'react';
import loadingGif from '../images/Rolling-1s-200px.svg';
import '../styles/Loading.css';

export default function Loading() {
  return (
    <main className="loading-wrapper">
      <img
        className="loading-gif"
        alt="gif de carregamento"
        src={ loadingGif }
      />
      <p>Carregando...</p>
    </main>
  );
}
