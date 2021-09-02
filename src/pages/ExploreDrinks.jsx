import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomDrink } from '../services/randomsAPI';

function ExploreDrinks() {
  const [drinkRandom, setDrinkRandom] = useState();

  useEffect(() => {
    fetchRandomDrink()
      .then((response) => setDrinkRandom(response.drinks[0].idDrink));
  });

  return (
    <>
      <Header titulo="Explorar Bebidas" showSearch={ false } />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${drinkRandom}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
