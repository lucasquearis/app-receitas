import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../Context/DataContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

function RecipesMainPage() {
  const location = useLocation();
  const { recipesData, setRecipesData } = useData();
  const [database, setDatabase] = useState('');
  const [databaseKey, setDatabaseKey] = useState('');
  const [recipeKey, setRecipeKey] = useState('');

  useEffect(() => {
    switch (location.pathname) {
    case '/comidas':
      setDatabase('themealdb');
      setDatabaseKey('meals');
      setRecipeKey('Meal');
      break;
    case '/bebidas':
      setDatabase('thecocktaildb');
      setDatabaseKey('drinks');
      setRecipeKey('Drink');
      break;
    default:
      console.log('Failed to set database!');
    }
  }, [location.pathname]);

  useEffect(() => {
    const getRecipes = async () => {
      const URL = `https://www.${database}.com/api/json/v1/1/search.php?s=`;
      const max = 12;
      const results = await fetch(URL).then((stuff) => stuff.json());
      if (results[databaseKey].length > max) results[databaseKey].length = max;
      setRecipesData(results[databaseKey]);
    };
    getRecipes();
  }, [database, databaseKey, setRecipesData]);

  const renderRecipesList = () => recipesData.map((recipe, index) => {
    const title = `str${recipeKey}`;
    const thumb = `str${recipeKey}Thumb`;
    console.log(`Thumb: ${thumb}`);
    const id = `id${recipeKey}`;
    return (
      <RecipeCard
        key={ recipe[id] }
        thumb={ recipe[thumb] }
        title={ recipe[title] }
        index={ index }
      />);
  });

  return (
    <div>
      <Header />
      { renderRecipesList() }
    </div>
  );
}

export default RecipesMainPage;
