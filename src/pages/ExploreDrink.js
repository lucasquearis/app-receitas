import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrink() {
  const { push } = useHistory();

  const handleClick = async () => {
    try {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      );
      const { drinks } = await response.json();
      push(`/bebidas/${drinks[0].idDrink}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="categories">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="btn btn-success"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          className="btn btn-success"
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
