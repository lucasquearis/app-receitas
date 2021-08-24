import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

function ExploreDrinksOrMeals() {
  const { pathname } = useLocation();
  if (pathname === '/explorar/comidas') {
    return (
      <div>
        <p>Explore Drinks or Meals</p>
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <Link to="/explorar/comidas">
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreDrinksOrMeals;
