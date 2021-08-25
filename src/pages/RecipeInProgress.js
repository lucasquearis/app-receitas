import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
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
  const [areChecked, setAreChecked] = useState(new Array(max).fill(false));
  const [completed, setCompleted] = useState(false);

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
    };
    getRecipeDetails();
  }, [pathname, database, id, databaseKey, setRecipeDetails]);

  useEffect(() => {
    const newIng = [];
    for (let index = 1; index <= max; index += 1) {
      const ing = recipeDetails[`strIngredient${index}`];
      const mea = recipeDetails[`strMeasure${index}`];
      if (ing === '' || ing === null || ing === undefined) break;
      newIng.push(`${ing} - ${mea}`);
    }
    setIngredients(newIng);
  }, [recipeDetails]);

  useEffect(() => {
    const checker = areChecked.slice(0, ingredients.length);
    setCompleted(checker.every((value) => value === true));
  }, [areChecked, ingredients.length]);

  const handleCheck = (index) => {
    const newState = [...areChecked];
    newState[index] = !newState[index];
    setAreChecked(newState);
  };

  const renderIngredientList = () => {
    console.log(ingredients);
    return ingredients.map((ingredient, index) => (
      <li
        key={ index }
        style={ areChecked[index] ? { textDecoration: 'line-through' } : {} }
        data-testid={ `${index}-ingredient-step` }
      >
        <Input
          type="checkbox"
          checked={ areChecked[index] }
          onChange={ () => handleCheck(index) }
        // testId={ `${index}-ingredient-step` }
        />
        { ingredient }
      </li>
    ));
  };
  const title = `str${recipeKey}`;
  const thumb = `str${recipeKey}Thumb`;

  return (
    <div className="progress-container">
      <img src={ recipeDetails[thumb] } data-testid="recipe-photo" alt="Recipe" />
      <h2 data-testid="recipe-title">{ recipeDetails[title] }</h2>
      <Button testId="share-btn" name="Share" disabled={ false } />
      <Button testId="favorite-btn" name="Favoritar" disabled={ false } />
      <h3 data-testid="recipe-category">{ recipeDetails.strCategory }</h3>
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
