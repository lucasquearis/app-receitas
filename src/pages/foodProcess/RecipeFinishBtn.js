import React from 'react';
import { useSelector } from 'react-redux';
import { string } from 'prop-types';
import { disableFinishRecipeBtn } from '../../functions';

const RecipeFinishBtn = ({ id, type }) => {
  let recipeType;
  if (type === 'meals') {
    recipeType = 'meals';
  } else {
    recipeType = 'cocktails';
  }

  const foodType = useSelector((state) => state.inProcessReducer[recipeType]);

  const disable = disableFinishRecipeBtn(foodType, id, recipeType);

  return (
    <button
      type="button"
      disabled={ !disable }
      data-testid="finish-recipe-btn"
    >
      Finalizar Receita
    </button>
  );
};

RecipeFinishBtn.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
};

export default RecipeFinishBtn;
