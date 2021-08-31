import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useIngredients from '../hooks/useIngredients';

function ExploreFoodByIngredients() {
  const ingredients = useIngredients('meal');
  const { loading } = useSelector((state) => state.reducerAPI);

  if (loading) return 'Loading';

  return (
    <div className="ingredients-list">
      <HeaderWithoutSearch>Explorar Ingredientes</HeaderWithoutSearch>
      {ingredients.map(({ strIngredient }, i) => (
        <div
          key={ strIngredient }
          className="ingredient"
          data-testid={ `${i}-ingredient-card` }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ `${strIngredient} thumbnail` }
            data-testid={ `${i}-card-img` }
          />
          <h4 data-testid={ `${i}-card-name` }>{strIngredient}</h4>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
