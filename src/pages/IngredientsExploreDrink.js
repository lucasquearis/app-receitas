import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientsExploreFood() {
  return (
    <div>
      <Header title="Explorar Ingredientes das Bebidas" />
      <section>
        {/* <img src={} alt="imagem da comida/bebida" data-testid="recipe-photo" /> */}
        <h2 data-testid="recipe-title">nome da comida</h2>
        {/* <button type="button" data-testid="share-btn"></button> */}
      </section>
      <Footer />
    </div>
  );
}

export default IngredientsExploreFood;
