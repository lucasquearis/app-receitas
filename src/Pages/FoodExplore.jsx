import React from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function FoodExplore() {
  const getRandomId = () => {
    const DUZENTOS = 282;
    const min = Math.ceil(1);
    const max = Math.floor(DUZENTOS);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randomId = getRandomId();
  const path = `/comidas/${randomId}`;

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ <Redirect to="/explorar/comidas/ingredientes" /> }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ <Redirect to="/explorar/comidas/area" /> }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ <Redirect to={ path } /> }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default FoodExplore;
