import React from 'react';
import dinnorLogo from '../images/dinnor_amarelo_certo.png';
import dinossauroAmarelo from '../images/dinossauro_amarelo_certo.png';
import '../styles/loading.css';

export default function Loading() {
  return (
    <div className="loading-div">
      <img src={ dinossauroAmarelo } alt="dinossauro" className="dinossauro" />
      <img src={ dinnorLogo } alt="dinnorlogo" className="dinnor-logo" />
      <p className="ploading">Loading</p>
    </div>
  );
}
