import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import { func, number, string } from 'prop-types';
import { createIngredients, createDecorations,
  doesItExist, handleDisabled } from '../../utils';
import Loading from '../Loading';

const Ingredients = ({ max, page, setDisabled }) => {
  const { id } = useParams();
  const meals = useSelector(({ food }) => food.meals);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const location = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [textDecorations, setDecorations] = useState([]);
  const recipeParam = location.pathname.split('/')[1];
  const recipeType = recipeParam === 'comidas' ? 'meals' : 'cocktails';

  useEffect(() => {
    const recipe = recipeParam === 'comidas' ? meals : drinks;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const buildIngredients = async () => {
      if (!inProgressRecipes || !inProgressRecipes[recipeType][id]) {
        const getIngredients = createIngredients(recipe, max);
        const getDecorations = createDecorations(getIngredients);
        const getDisabled = handleDisabled(getIngredients);
        setIngredients(getIngredients);
        setDecorations(getDecorations);
        setDisabled(getDisabled);
      } else {
        const getIngredients = inProgressRecipes[recipeType][id];
        const getDecorations = createDecorations(getIngredients);
        const getDisabled = handleDisabled(getIngredients);
        setIngredients(getIngredients);
        setDecorations(getDecorations);
        setDisabled(getDisabled);
      }
    };
    buildIngredients();
  }, [id, location, meals, drinks, max, recipeParam, recipeType, setDisabled]);

  const handleDone = (index) => {
    const newIngredients = ingredients.map((ingredient, ingredientIndex) => {
      if (ingredientIndex === index) {
        return { ...ingredient, done: !ingredient.done };
      }
      return ingredient;
    });
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const oldInProgress = doesItExist(inProgressRecipes);
    const newInprogress = {
      ...oldInProgress,
      [recipeType]: { ...oldInProgress[recipeType], [id]: newIngredients },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInprogress));
    const newDecorations = createDecorations(newIngredients);
    const getDisabled = handleDisabled(newIngredients);
    setIngredients(newIngredients);
    setDecorations(newDecorations);
    setDisabled(getDisabled);
  };

  if (!ingredients) return <Loading />;

  if (page === 'details') {
    return (
      <ul className="ingredients">
        { ingredients.map((ingredient, index) => (
          <li
            key={ `ingredient-${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient.measure} of ${ingredient.name}` }
          </li>)) }
      </ul>
    );
  }

  return (
    <div className="ingredients-container">
      { ingredients.map((ingredient, index) => (
        <div
          key={ `ingredient-${index}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            id={ `ingredient-${index}` }
            className="ingredient-check"
            type="checkbox"
            onChange={ () => handleDone(index) }
            checked={ ingredient.done }
          />
          <label htmlFor={ `ingredient-${index}` } style={ textDecorations[index] }>
            { `${ingredient.measure} of ${ingredient.name}` }
          </label>
        </div>
      )) }
    </div>
  );
};

Ingredients.defaultProps = {
  setDisabled: () => 'Xablau',
};

Ingredients.propTypes = {
  max: number.isRequired,
  page: string.isRequired,
  setDisabled: func,
};

export default Ingredients;
