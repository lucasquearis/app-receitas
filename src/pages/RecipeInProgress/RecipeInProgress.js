import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import './RecipeInProgress.css';
import {
  Title,
  Category,
  Header,
  Ingredients,
  Instructions,
} from '../../components/RecipeInProgress';
import setDoneRecipes from '../../components/functions/setDoneRecipes';
import renderIngredientList from '../../components/functions/renderIngredientList';
import fetchRecipeDetails from '../../services/fetchRecipeDetails';
import getNewIng from '../../components/functions/getNewIng';
import addToStorage from '../../components/functions/addToStorage';

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
      const getData = await fetchRecipeDetails(database, id);
      setRecipeDetails(getData[databaseKey][0]);
      const newIng = getNewIng(getData, databaseKey, max);
      setIngredients(newIng);
    };
    getRecipeDetails();
  }, [pathname, database, id, databaseKey, setRecipeDetails]);

  useEffect(() => {
    addToStorage(databaseKey, checked, id);
  }, [checked, databaseKey, id]);

  const handleCheck = (index) => {
    let newChecked = [...checked];
    if (checked.includes(index)) newChecked = checked.filter((item) => item !== index);
    else newChecked.push(index);
    setChecked(newChecked);
    if (newChecked.length >= ingredients.length) setCompleted(true);
    else setCompleted(false);
  };

  setDoneRecipes(recipeDetails, recipeKey);
  const newBtnColor = { background: '#6ce34f', color: 'white' };
  return (
    <div className="progress-container">
      <Header recipeDetails={ recipeDetails } recipeKey={ recipeKey } />
      <Title recipeDetails={ recipeDetails } recipeKey={ recipeKey } />
      <Category recipeDetails={ recipeDetails } />
      <Ingredients
        renderIngredientList={
          () => renderIngredientList(ingredients, checked, handleCheck)
        }
      />
      <Instructions recipeDetails={ recipeDetails } />
      <Button
        testId="finish-recipe-btn"
        name="Finalizar"
        disabled={ !completed }
        link="/receitas-feitas"
        onClick={ setDoneRecipes }
        className="btn-finalizar"
        style={ completed ? newBtnColor : {} }
      />
    </div>
  );
}

export default RecipeInProgress;
