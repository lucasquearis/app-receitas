import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../foodDrinks.css';
import { startDrinkRecipe } from '../../services';

function BtnDrinks({ dataId, className, details, id }) {
  const [button, setButton] = useState(false);
  const drinkDetails = details.drinks[0];
  const objKeyDrink = Object.keys(drinkDetails);
  const filterObjDrink = objKeyDrink.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjDrink = filterObjDrink.filter((obj) => drinkDetails[obj] !== null);

  const checkRecipeId = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage.cocktails) {
      const findId = Object.keys(storage.cocktails).find((key) => key === id);
      if (findId) {
        setButton(true);
      } else {
        setButton(false);
      }
    }
  }, [id]);

  useEffect(() => {
    checkRecipeId();
  }, [checkRecipeId]);

  const inProgressRecipes = {
    [id]: otherFilterObjDrink.map((drink) => drinkDetails[drink]),
  };

  return (
    <button
      type="button"
      onClick={ () => setButton(startDrinkRecipe(inProgressRecipes)) }
      data-testid={ dataId }
      className={ className }
    >
      { button ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

BtnDrinks.propTypes = {
  onClick: PropTypes.func,
  dataId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  info: PropTypes.string,
}.isRequired;

export default BtnDrinks;
