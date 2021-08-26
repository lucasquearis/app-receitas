import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BebidasIngredientes() {
  return (
    <div>
      <Header title="Explorar Ingredientes" renderSearch={ false } />
      <Footer />
    </div>
  );
}

export default BebidasIngredientes;
