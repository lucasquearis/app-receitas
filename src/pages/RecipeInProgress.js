import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

function RecipeInProgress() {
  const max = 20;
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [id, setId] = useState('');
  const [database, setDatabase] = useState('');
  const [databaseKey, setDatabaseKey] = useState('');
  const [recipeKey, setRecipeKey] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [areChecked, setAreChecked] = useState(new Array(max).fill(false));

  useEffect(() => {
    const startSubstring = 9;
    const endSubstring = 13;
    setId(pathname.substring(startSubstring, endSubstring));
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
    const URL = `www.${database}.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipeDetails = async () => {
      const results = await fetch(URL).then((stuff) => stuff.json());
      setRecipeDetails(results[databaseKey][0]);
    };
    getRecipeDetails();
  }, [pathname, database, id, databaseKey, setRecipeDetails]);

  useEffect(() => {
    const newIng = [];
    for (let index = max; index > 0; index -= 1) {
      const ing = recipeDetails[`strIngredient${index}`];
      const mea = recipeDetails[`strMeasure${index}`];
      if (ing === '' || ing === null) break;
      newIng.push(`${ing} - ${mea}`);
    }

    setIngredients(newIng);
  }, [recipeDetails]);

  const handleCheck = (index) => {
    const newState = [...areChecked];
    newState[index] = !newState[index];
    setAreChecked(newState);
  };

  const renderIngredientList = () => ingredients.map((ingredient, index) => (
    <li key={ index }>
      <Input
        type="checkbox"
        checked={ areChecked[index] }
        onChange={ () => handleCheck(index) }
      />
    </li>
  ));

  const title = `str${recipeKey}`;
  const thumb = `str${recipeKey}Thumb`;

  return (
    <div>
      <p>Caralhow</p>
      <img src={ recipeDetails[thumb] } data-testid="recipe-photo" alt="Recipe" />
      <h2 data-testid="recipe-title">{ recipeDetails[title] }</h2>
      <Button testId="share-btn" />
      <Button testId="favorite-btn" />
      <h3 data-testid="recipe-category">{ recipeDetails.strCategory }</h3>
      <ul>{ renderIngredientList() }</ul>
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      <Button testId="finish-recipe-btn" />
    </div>
  );
}

export default RecipeInProgress;
