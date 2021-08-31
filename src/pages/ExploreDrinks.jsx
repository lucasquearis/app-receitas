import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../services/fetchRandoms';

export default function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState(0);
  useEffect(() => {
    fetchRandomDrink()
      .then((response) => setRandomDrink(response.drinks[0].idDrink));
  });
  return (
    <div>
      <Header title="Explorar Bebidas" search={ false } />
      <div className="explore-container">
        <Link
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="explore-btn"
        >
          Por Ingredientes
        </Link>
        <Link
          to={ `/bebidas/${randomDrink}` }
          data-testid="explore-surprise"
          className="explore-btn"
        >
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
}
