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

const buildIngredients = (cocktail, idURL) => {
  const ingredientsKeys = getIngredientsKeys(cocktail);
  const lastSaveProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    meals: {}, cocktails: {},
  };
  return {
    [idURL]: ingredientsKeys.map((ingredientKey, index) => ({
      [cocktail[ingredientKey]]: lastSaveProgress.cocktails[idURL]
        ? lastSaveProgress.cocktails[idURL][index][cocktail[ingredientKey]]
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
    setIngredients(buildIngredients(foodOrDrink, idURL));
  }, [foodOrDrink, idURL]);

  const isAllDone = () => ingredients.wereFetched && ingredients[idURL]
    .every((ingredient) => Object.values(ingredient)[0] === true);

  const handleCheckboxChange = ({ target }) => {
    setIngredients({
      [idURL]: getIngredientsList(target, idURL, ingredients, foodOrDrink),
      wereFetched: true,
    });
    console.log(target.id);
    if (target.id.includes('food')) {
      saveFoodProgress(target, idURL, ingredients, foodOrDrink);
    }
    if (target.id.includes('drink')) {
      saveDrinkProgress(target, idURL, ingredients, foodOrDrink);
    }
  };

  setAllDone(isAllDone());

  return (
    <div>
      {ingredientsKeys.map((ingredientKey, index) => (
        <div key={ index }>
          <label
            htmlFor={ foodOrDrink.idMeal ? `${index}food` : `${index}drink` }
            data-testid={ `${index}-ingredient-step` }
            style={ ingredients.wereFetched
          && ingredients[idURL][index][foodOrDrink[ingredientKey]]
              ? { 'text-decoration': 'line-through' }
              : {} }
          >
            <input
              id={ foodOrDrink.idMeal ? `${index}food` : `${index}drink` }
              name={ foodOrDrink[ingredientKey] }
              type="checkbox"
              onChange={ handleCheckboxChange }
              checked={ ingredients.wereFetched
              && ingredients[idURL][index][foodOrDrink[ingredientKey]] }
            />
            {console.log(foodOrDrink.idMeal ? `${index}food` : `${index}drink`)}
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
