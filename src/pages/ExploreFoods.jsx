import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
