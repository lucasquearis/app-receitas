import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import { func, number, string } from 'prop-types';
import { createIngredients, createDecorations,
  getLocalStorage, handleDisabled } from '../../utils';
import Loading from '../Loading';
import './style.css';

const Ingredients = ({ max, page, setDisabled }) => {
  const { id } = useParams();
  const meals = useSelector(({ food }) => food.meals);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [textDecorations, setDecorations] = useState([]);
  const recipeType = pathname.includes('comidas') ? 'meals' : 'cocktails';

  useEffect(() => {
    const recipe = recipeType === 'meals' ? meals : drinks;
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    const buildIngredients = async () => {
      if (!inProgressRecipes[recipeType][id]) {
        const newIngredients = createIngredients(recipe, max);
        const newDecorations = createDecorations(newIngredients);
        const newDisabled = handleDisabled(newIngredients);
        setIngredients(newIngredients);
        setDecorations(newDecorations);
        setDisabled(newDisabled);
      } else {
        const newIngredients = inProgressRecipes[recipeType][id];
        const newDecorations = createDecorations(newIngredients);
        const newDisabled = handleDisabled(newIngredients);
        setIngredients(newIngredients);
        setDecorations(newDecorations);
        setDisabled(newDisabled);
      }
    };
    buildIngredients();
  }, [id, meals, drinks, max, recipeType, setDisabled]);

  const saveProgressToLocalStorage = (index) => {
    const newIngredients = ingredients.map((ingredient, ingredientIndex) => {
      if (ingredientIndex === index) {
        return { ...ingredient, done: !ingredient.done };
      }
      return ingredient;
    });
    const oldInProgress = getLocalStorage('inProgressRecipes');
    const newInprogress = {
      ...oldInProgress,
      [recipeType]: { ...oldInProgress[recipeType], [id]: newIngredients },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInprogress));
    return newIngredients;
  };

  const handleDone = (index) => {
    const newIngredients = saveProgressToLocalStorage(index);
    const newDecorations = createDecorations(newIngredients);
    const newDisabled = handleDisabled(newIngredients);
    setIngredients(newIngredients);
    setDecorations(newDecorations);
    setDisabled(newDisabled);
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
      <p>Ingredients</p>
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
  setDisabled: () => {},
};

Ingredients.propTypes = {
  max: number.isRequired,
  page: string.isRequired,
  setDisabled: func,
};

export default Ingredients;
