import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomMeal } from '../services/fetchRandoms';

export default function ExploreMeals() {
  const [randomMeal, setRandomMeal] = useState(0);
  useEffect(() => {
    fetchRandomMeal()
      .then((response) => setRandomMeal(response.meals[0].idMeal));
  }, []);
  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <div className="explore-container">
        <Link
          to="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="explore-btn"
        >
          Por Ingredientes
        </Link>
        <Link
          to="/explorar/comidas/area"
          data-testid="explore-by-area"
          className="explore-btn"
        >
          Por Local de Origem
        </Link>
        <Link
          to={ `/comidas/${randomMeal}` }
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
