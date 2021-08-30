import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreDrink from '../components/ExploreDrink';

function ExplorarBebidas() {
  return (
    <div>
      <Header titulo="Explorar Bebidas" />
      <ExploreDrink />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
