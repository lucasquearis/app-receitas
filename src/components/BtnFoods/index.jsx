import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { startFoodRecipe } from '../../services';

function BtnFoods({ dataId, className, details, id }) {
  const [button, setButton] = useState(false);
  const foodDetails = details.meals[0];
  const objKeyFood = Object.keys(foodDetails);
  const filterObjFood = objKeyFood.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjFood = filterObjFood.filter((obj) => foodDetails[obj] !== '');

  const checkRecipeId = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage.meals) {
      const findId = Object.keys(storage.meals).find((key) => key === id);
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
    [id]: otherFilterObjFood.map((food) => foodDetails[food]),
  };

  return (
    <button
      type="button"
      onClick={ () => setButton(startFoodRecipe(inProgressRecipes)) }
      data-testid={ dataId }
      className={ className }
    >
      { button ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

BtnFoods.propTypes = {
  onClick: PropTypes.func,
  dataId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  info: PropTypes.string,
}.isRequired;

export default BtnFoods;
