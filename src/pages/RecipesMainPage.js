import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../Context/DataContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Button from '../components/Button';

function RecipesMainPage() {
  const location = useLocation();
  const { recipesData, setRecipesData } = useData();
  const [categories, setCategories] = useState([]);
  const [selCategory, setSelCategory] = useState('');
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
    const getCategories = async () => {
      const URL = `https://www.${database}.com/api/json/v1/1/list.php?c=list`;
      const max = 5;
      const results = await fetch(URL).then((stuff) => stuff.json());
      if (results[databaseKey].length > max) results[databaseKey].length = max;
      setCategories(results[databaseKey]);
    };
    getRecipes();
    getCategories();
  }, [database, databaseKey, setRecipesData]);

  const handleCategoryClick = (category) => {
    setSelCategory(category);
    const getRecipesCategory = async () => {
      let URL = `https://www.${database}.com/api/json/v1/1/filter.php?c=${category}`;
      if (category === selCategory) {
        URL = `https://www.${database}.com/api/json/v1/1/search.php?s=`;
        setSelCategory('');
      }
      const max = 12;
      const results = await fetch(URL).then((stuff) => stuff.json());
      if (results[databaseKey].length > max) results[databaseKey].length = max;
      setRecipesData(results[databaseKey]);
    };
    getRecipesCategory();
  };

  const renderRecipesList = () => recipesData.map((recipe, index) => {
    const title = `str${recipeKey}`;
    const thumb = `str${recipeKey}Thumb`;
    const id = `id${recipeKey}`;
    console.log(categories);
    return (
      <RecipeCard
        key={ recipe[id] }
        thumb={ recipe[thumb] }
        title={ recipe[title] }
        index={ index }
      />);
  });

  const renderCategoryButtons = () => categories.map(({ strCategory }, index) => {
    console.log(categories);
    return (
      <Button
        key={ index }
        testId={ `${strCategory}-category-filter` }
        name={ strCategory }
        disabled={ false }
        onClick={ () => handleCategoryClick(strCategory) }
      />);
  });

  return (
    <div>
      <Header />
      { renderCategoryButtons() }
      { renderRecipesList() }
    </div>
  );
}

export default RecipesMainPage;
