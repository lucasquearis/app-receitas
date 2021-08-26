import React from 'react';
import Header from '../../components/Header';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';

function ExploreDrinkIngredient() {
  return (
    <div>
      <Header brand="Explorar Ingredientes" className="img-search" />
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredient;
