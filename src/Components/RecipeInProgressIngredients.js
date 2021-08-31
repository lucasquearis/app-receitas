import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import AppContext from '../Context/AppContext';

import RecipeInProgressCheckBox from './RecipeInProgressCheckBox';

function RecipeInProgressIngredients({ type, recipeID }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setMadeRecipe } = useContext(AppContext);

  const verifyItsDone = (element) => element.done === true;

  useEffect(() => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'food' && inProgressStorage !== undefined) {
      console.log(typeof(recipeID));
      console.log((inProgressStorage.meals));
      console.log(inProgressStorage.meals[recipeID]);
      setIngredientsList((inProgressStorage.meals)[recipeID]);
      console.log(ingredientsList);
    }

    if (type === 'drink' && inProgressStorage !== undefined) {
      setIngredientsList(inProgressStorage.cocktails[recipeID]);
      console.log(ingredientsList);
    }
  }, [recipeID, type, ingredientsList]);

  const changeChecked = (index) => {
    const newIngredientsList = ingredientsList;
    newIngredientsList[index].done = !newIngredientsList[index].done;
    setIngredientsList(newIngredientsList);

    if (ingredientsList.every(verifyItsDone)) {
      setMadeRecipe(true);
    } else {
      setMadeRecipe(false);
    }

    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'food') {
      inProgressStorage.meals[recipeID] = ingredientsList;
    } else {
      inProgressStorage.cocktails[recipeID] = ingredientsList;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
  };

  useEffect(() => {
    if (ingredientsList !== undefined) {
      setMadeRecipe(ingredientsList.every(verifyItsDone));
    }
  });

  if (ingredientsList === undefined) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden"> </span>
      </Spinner>
    );
  }

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
};

export default RecipeInProgressIngredients;
