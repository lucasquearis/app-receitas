import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function IngredientsInProgress({ ingredients, pathnameAPI, id }) {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const onlyIngredients = Object.entries(ingredients).filter(
    (key) => key[1] !== null && key[1] !== '' && key[0].includes('strIngredient'),
  );
  const { setAllChecked } = useContext(AppContext);

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {
        meals: {},
        cocktails: {},
      };
    const key = pathnameAPI === 'comidas' ? 'meals' : 'cocktails';
    const ingredientsLS = inProgressRecipes[key][id] || [];
    if (ingredientsLS.length === onlyIngredients.length) {
      setAllChecked(true);
    }
  }, [id, pathnameAPI, setAllChecked, onlyIngredients]);

  const makeList = () => {
    const list = [];
    for (let index = 1; index <= onlyIngredients.length; index += 1) {
      if (ingredients[`strIngredient${index}`] !== null
        && ingredients[`strIngredient${index}`] !== '') {
        list.push(
          `${ingredients[`strIngredient${index}`]} - 
          ${ingredients[`strMeasure${index}`]}`,
        );
      }
    }
    return list;
  };

  const updateLocalStorage = (recipeId, ingredient, update) => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {
        meals: {},
        cocktails: {},
      };
    const key = pathnameAPI === 'comidas' ? 'meals' : 'cocktails';

    if (update === 'add') {
      const updateLS = {
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [recipeId]: [
            ...(inProgressRecipes[key][recipeId] || []),
            ingredient,
          ],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updateLS));
    } else {
      const updateLS = {
        ...inProgressRecipes,
        [key]: {
          ...inProgressRecipes[key],
          [recipeId]: inProgressRecipes[key][recipeId]
            .filter((item) => item !== ingredient),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updateLS));
    }
  };

  const checkedLS = (recipeId, ingredient) => {
    const inProgressLS = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {
        meals: {},
        cocktails: {},
      };
    const checkId = [...Object.keys(inProgressLS.meals),
      ...Object.keys(inProgressLS.cocktails)].includes(recipeId);
    if (checkId) {
      const getIngredients = inProgressLS.meals[recipeId]
      || inProgressLS.cocktails[recipeId];
      return getIngredients.includes(ingredient);
    }
    return false;
  };

  const handleChange = ({ target: { checked, name } }) => {
    if (checked) {
      setCheckedIngredients((prevState) => [...prevState, name]);
      updateLocalStorage(id, name, 'add');
    } else {
      setCheckedIngredients((prevState) => prevState
        .filter((ingredient) => ingredient !== name));
      setAllChecked(false);
      updateLocalStorage(id, name, 'remove');
    }
  };

  return (
    <section className="ingredients-in-progress">
      <h2>Ingredients</h2>
      <section>
        {makeList().map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            style={ checkedIngredients.some((item) => item === ingredient)
              ? { textDecorationLine: 'line-through' } : null }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              onChange={ handleChange }
              checked={ checkedLS(id, ingredient) }
            />
            {ingredient}
          </label>
        ))}
      </section>
    </section>
  );
}

IngredientsInProgress.propTypes = {
  ingredients: PropTypes.shape({ ingredient: PropTypes.string }).isRequired,
  pathnameAPI: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
