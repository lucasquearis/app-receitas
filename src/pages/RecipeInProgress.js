import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const max = 20;
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [id, setId] = useState('');
  const [database, setDatabase] = useState('themealdb');
  const [databaseKey, setDatabaseKey] = useState('meals');
  const [recipeKey, setRecipeKey] = useState('Meal');
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (currentStorage !== null
      && `${databaseKey}` in currentStorage
      && `${id}` in currentStorage[databaseKey]) {
      setChecked(currentStorage[databaseKey][`${id}`]);
    }
  }, [id, databaseKey]);

  useEffect(() => {
    setId(pathname.split('/')[2]);
    if (pathname.includes('comidas')) {
      setDatabase('themealdb');
      setDatabaseKey('meals');
      setRecipeKey('Meal');
    }
    if (pathname.includes('bebidas')) {
      setDatabase('thecocktaildb');
      setDatabaseKey('drinks');
      setRecipeKey('Drink');
    }
    const getRecipeDetails = async () => {
      const URL = `https://www.${database}.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const data = await response.json();
      setRecipeDetails(data[databaseKey][0]);
      const newIng = [];
      for (let index = 1; index <= max; index += 1) {
        const ing = data[databaseKey][0][`strIngredient${index}`];
        const mea = data[databaseKey][0][`strMeasure${index}`];
        if (ing === '' || ing === null || ing === undefined) break;
        newIng.push(`${ing} - ${mea}`);
      }
      setIngredients(newIng);
    };
    getRecipeDetails();
  }, [pathname, database, id, databaseKey, setRecipeDetails]);

  useEffect(() => {
    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let newStorage = {};
    if (currentStorage) {
      newStorage = { ...currentStorage,
        [databaseKey]: { ...currentStorage[databaseKey],
          [`${id}`]: checked,
        },
      };
    } else newStorage = { [databaseKey]: { [id]: checked } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }, [checked, databaseKey, id]);

  const handleCheck = (index) => {
    let newChecked = [...checked];
    if (checked.includes(index)) newChecked = checked.filter((item) => item !== index);
    else newChecked.push(index);
    setChecked(newChecked);
    if (newChecked.length >= ingredients.length) setCompleted(true);
    else setCompleted(false);
  };

  const renderIngredientList = () => ingredients.map((ingredient, index) => (
    <li
      key={ index }
      style={ checked.includes(index) ? { textDecoration: 'line-through' } : {} }
      data-testid={ `${index}-ingredient-step` }
    >
      <Input
        type="checkbox"
        checked={ checked.includes(index) }
        onChange={ () => handleCheck(index) }
      />
      { ingredient }
    </li>
  ));

  return (
    <div className="progress-container">
      <img
        src={ recipeDetails[`str${recipeKey}Thumb`] }
        data-testid="recipe-photo"
        alt="Recipe"
      />
      <h3 data-testid="recipe-title">{ recipeDetails[`str${recipeKey}`] }</h3>
      <ShareButton recipeDetails={ recipeDetails } />
      <FavoriteButton recipeDetails={ recipeDetails } />
      <h4 data-testid="recipe-category">{ recipeDetails.strCategory }</h4>
      <ul>{ renderIngredientList() }</ul>
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      <Button
        testId="finish-recipe-btn"
        name="Finalizar"
        disabled={ !completed }
        link="/receitas-feitas"
      />
    </div>
  );
}

export default RecipeInProgress;
