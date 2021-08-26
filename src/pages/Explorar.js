import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" renderSearch={ false } />
      <Footer />
    </div>
  );
}

export default Explorar;
