import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  return (
    <div>
      <Header title="Perfil" renderSearch={ false } />
      <Footer />
    </div>
  );
}

export default Perfil;
