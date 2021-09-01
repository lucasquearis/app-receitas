import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipeAllDoneContext from '../context/RecipeAllDone';

const getIngredientsKeys = (foodOrDrink) => Object.keys(foodOrDrink)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
    && foodOrDrink[ingredient] !== null && foodOrDrink[ingredient] !== '');

const getIngredientsList = (target, idURL, ingredients, foodOrDrink) => {
  const ingredientsKeys = getIngredientsKeys(foodOrDrink);
  return ingredientsKeys
    .map((ingredientKey, index) => ({
      [foodOrDrink[ingredientKey]]: target.name === foodOrDrink[ingredientKey]
        ? target.checked
        : ingredients[idURL][index][foodOrDrink[ingredientKey]],
    }));
};

const saveDrinkProgress = (target, idURL, ingredients, drink) => {
  const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...lastSave,
    cocktails: {
      ...lastSave.cocktails,
      [idURL]: getIngredientsList(target, idURL, ingredients, drink),
    },
    meals: {
      ...lastSave.meals,
    },
  }));
};

const saveFoodProgress = (target, idURL, ingredients, food) => {
  const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...lastSave,
    meals: {
      ...lastSave.meals,
      [idURL]: getIngredientsList(target, idURL, ingredients, food),
    },
    cocktails: {
      ...lastSave.cocktails,
    },
  }));
};

const buildIngredients = (foodOrDrink, idURL, storageKey) => {
  const ingredientsKeys = getIngredientsKeys(foodOrDrink);
  const lastSaveProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    meals: {}, cocktails: {},
  };
  return {
    [idURL]: ingredientsKeys.map((ingredientKey, index) => ({
      [foodOrDrink[ingredientKey]]: lastSaveProgress[storageKey][idURL]
        ? lastSaveProgress[storageKey][idURL][index][foodOrDrink[ingredientKey]]
        : false,
    })),
    wereFetched: true,
  };
};

const getIdFromURL = (location) => location.pathname.split('/')[2];

function IngredientsCheckboxList(props) {
  const { foodOrDrink } = props;
  const { setAllDone } = useContext(RecipeAllDoneContext);
  const [ingredients, setIngredients] = useState({ wereFetched: false });
  const location = useLocation();
  const idURL = getIdFromURL(location);
  const ingredientsKeys = getIngredientsKeys(foodOrDrink);

  useEffect(() => {
    if (foodOrDrink.idMeal) {
      setIngredients(buildIngredients(foodOrDrink, idURL, 'meals'));
    } else if (foodOrDrink.idDrink) {
      setIngredients(buildIngredients(foodOrDrink, idURL, 'cocktails'));
    }
  }, [foodOrDrink, idURL]);

  const isAllDone = () => ingredients.wereFetched && ingredients[idURL]
    .every((ingredient) => Object.values(ingredient)[0] === true);

  const handleCheckboxChange = ({ target }) => {
    setIngredients({
      [idURL]: getIngredientsList(target, idURL, ingredients, foodOrDrink),
      wereFetched: true,
    });
    if (foodOrDrink.idMeal) {
      saveFoodProgress(target, idURL, ingredients, foodOrDrink);
    }
    if (foodOrDrink.idDrink) {
      saveDrinkProgress(target, idURL, ingredients, foodOrDrink);
    }
  };

  setAllDone(isAllDone());

  return (
    <div>
      {ingredientsKeys.map((ingredientKey, index) => (
        <div key={ index }>
          <label
            htmlFor={ `${index}${foodOrDrink[ingredientKey]}` }
            data-testid={ `${index}-ingredient-step` }
            style={ ingredients.wereFetched
          && ingredients[idURL][index][foodOrDrink[ingredientKey]]
              ? { 'text-decoration': 'line-through' }
              : {} }
          >
            <input
              id={ `${index}${foodOrDrink[ingredientKey]}` }
              name={ foodOrDrink[ingredientKey] }
              type="checkbox"
              onChange={ handleCheckboxChange }
              defaultChecked={ ingredients.wereFetched
              && ingredients[idURL][index][foodOrDrink[ingredientKey]] }
              // checked={ ingredients.wereFetched
              // && ingredients[idURL][index][foodOrDrink[ingredientKey]] }
            />
            {` ${foodOrDrink[ingredientKey]} - ${foodOrDrink[`strMeasure${index + 1}`]}`}
          </label>
        </div>
      ))}
    </div>
  );
}

IngredientsCheckboxList.propTypes = {
  foodOrDrink: PropTypes.shape().isRequired,
};

export default IngredientsCheckboxList;
