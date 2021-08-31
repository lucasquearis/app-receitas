import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useIngredients from '../hooks/useIngredients';

function ExploreDrinksByIngredients() {
  const ingredients = useIngredients('cocktail');
  const { loading } = useSelector((state) => state.reducerAPI);

  if (loading) return 'Loading';

  return (
    <div className="ingredients-list">
      <HeaderWithoutSearch>Explorar Ingredientes</HeaderWithoutSearch>
      {ingredients.map(({ strIngredient1 }, i) => {
        const thumbURL = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
        return (
          <div
            key={ strIngredient1 }
            className="ingredient"
            data-testid={ `${i}-ingredient-card` }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ thumbURL }
              alt={ `${strIngredient1} thumbnail` }
            />
            <h4 data-testid={ `${i}-card-name` }>{strIngredient1}</h4>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
