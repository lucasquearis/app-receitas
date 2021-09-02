import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';

import RecipeInProgressCheckBox from './RecipeInProgressCheckBox';

const defaultInProgresStorage = {
  cocktails: {},
  meals: {},
};

function RecipeInProgressIngredients({ ingredientList, type, recipeID }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setMadeRecipe } = useContext(AppContext);

  const verifyItsDone = (element) => element.done === true;

  useEffect(() => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressStorage === null) {
      setIngredientsList(ingredientList);
    }

    if (type === 'food'
    && inProgressStorage !== null) {
      setIngredientsList(inProgressStorage.meals[recipeID]);
    } else if (type === 'drink'
    && inProgressStorage !== null) {
      setIngredientsList(inProgressStorage.cocktails[recipeID]);
    }
  }, [recipeID, type, ingredientList]);

  const changeChecked = (index) => {
    const newIngredientsList = ingredientsList;
    newIngredientsList[index].done = !newIngredientsList[index].done;
    setIngredientsList(newIngredientsList);

    if (ingredientsList.every(verifyItsDone)) {
      setMadeRecipe(true);
    } else {
      setMadeRecipe(false);
    }

    const inProgressStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || defaultInProgresStorage;
    if (type === 'food' && inProgressStorage !== null) {
      inProgressStorage.meals[recipeID] = ingredientsList;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
    }
    if (type === 'drink' && inProgressStorage !== null) {
      inProgressStorage.cocktails[recipeID] = ingredientsList;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
    }
  };

  useEffect(() => {
    if (ingredientsList !== undefined) {
      setMadeRecipe(ingredientsList.every(verifyItsDone));
    }
  });

  return (
    <div className="ingredientsContainer">
      <h3>Ingredients</h3>
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={ item.ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <RecipeInProgressCheckBox
              isChecked={ item.done }
              ingredient={ item.ingredient }
              index={ index }
              changeChecked={ changeChecked }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

RecipeInProgressIngredients.propTypes = {
  recipeID: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredientList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeInProgressIngredients;
