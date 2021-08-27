import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../Context/DataContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import RecipesList from '../../components/RecipesMainPage/RecipesList';
import Footer from '../../components/Footer/Footer';
import './RecipesMainPage.css';

function RecipesMainPage() {
  const { pathname } = useLocation();
  const { recipesData, setRecipesData, selIngredient } = useData();
  const [categories, setCategories] = useState([]);
  const [selCategory, setSelCategory] = useState('All');
  const [database, setDatabase] = useState('');
  const [databaseKey, setDatabaseKey] = useState('');
  const [recipeKey, setRecipeKey] = useState('');

  useEffect(() => {
    switch (pathname) {
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
    let URL = `https://www.${database}.com/api/json/v1/1/search.php?s=`;
    if (selCategory !== 'All') URL = `https://www.${database}.com/api/json/v1/1/filter.php?c=${selCategory}`;
    if (selIngredient !== '') {
      URL = `https://www.${database}.com/api/json/v1/1/filter.php?i=${selIngredient}`;
    }
    const getRecipes = async () => {
      const max = 12;
      const results = await fetch(URL).then((stuff) => stuff.json());
      if (results[databaseKey].length > max) results[databaseKey].length = max;
      setRecipesData(results[databaseKey]);
    };
    const getCategories = async () => {
      const URLCat = `https://www.${database}.com/api/json/v1/1/list.php?c=list`;
      const max = 5;
      const results = await fetch(URLCat).then((stuff) => stuff.json());
      results[databaseKey].length = max;
      setCategories(results[databaseKey]);
    };
    getRecipes();
    getCategories();
  }, [database,
    databaseKey,
    setRecipesData,
    selCategory,
    selIngredient,
    pathname]);

  const handleCategoryClick = (category) => {
    if (category === selCategory) setSelCategory('All');
    else setSelCategory(category);
  };

  const renderCategoryButtons = () => (
    <>
      { selCategory !== 'All' && (<Button
        testId="All-category-filter"
        name="All"
        disabled={ false }
        onClick={ () => handleCategoryClick('All') }
      />) }
      { categories.map(({ strCategory }, index) => (
        <Button
          key={ index }
          testId={ `${strCategory}-category-filter` }
          name={ strCategory }
          disabled={ false }
          onClick={ () => handleCategoryClick(strCategory) }
        />
      ))}
    </>);

  return (
    <div className="main-container">
      <Header title={ pathname === '/comidas' ? 'Comidas' : 'Bebidas' } />
      <nav className="nav-container">
        { selIngredient !== '' ? null : renderCategoryButtons() }
      </nav>
      <RecipesList
        recipesData={ recipesData }
        recipeKey={ recipeKey }
      />
      <Footer />
    </div>
  );
}

export default RecipesMainPage;
