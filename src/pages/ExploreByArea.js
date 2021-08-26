import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';

function ExploreByArea() {
  const [recipesData, setRecipesData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selArea, setSelArea] = useState('All');

  useEffect(() => {
    let URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (selArea !== 'All') URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selArea}`;
    const getRecipes = async () => {
      const max = 12;
      const response = await fetch(URL);
      const data = await response.json();
      if (data.meals.length > max) data.meals.length = max;
      setRecipesData(data.meals);
    };
    const getCategories = async () => {
      const URLArea = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetch(URLArea);
      const data = await response.json();
      setAreas([{ strArea: 'All' }, ...data.meals]);
    };
    getRecipes();
    getCategories();
  }, [setRecipesData, selArea]);

  const renderAreaSelect = () => areas.map(({ strArea }, index) => (
    <option
      key={ index }
      value={ strArea }
      data-testid={ `${strArea}-option` }
    >
      {strArea}
    </option>
  ));

  return (
    <div>
      <Header />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (event) => setSelArea(event.target.value) }
      >
        { renderAreaSelect() }
      </select>
      <RecipesList
        recipesData={ recipesData }
        recipeKey="Meal"
      />
      <p>teste</p>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
