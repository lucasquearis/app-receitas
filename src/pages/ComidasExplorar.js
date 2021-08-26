import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ComidasExplorar() {
  return (
    <div>
      <Header title="Explorar Comidas" renderSearch={ false } />
      <Footer />
    </div>
  );
}

export default ComidasExplorar;
