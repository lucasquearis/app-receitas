import React, { useCallback, useEffect, useState } from 'react';
import { RecomendationCard } from '../components';

const UseRecomendationRecipes = (type) => {
  const [recipes, setRecipes] = useState([]);
  const fetchAPI = useCallback(async () => {
    if (type === 'meals') {
      let result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      result = await result.json();
      setRecipes(result);
    } if (type === 'drinks') {
      let result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      result = await result.json();
      setRecipes(result);
    }
  }, [type]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);
  const maxItensIndexOnScreen = 5;
  if (recipes.meals) {
    return recipes.meals.map((e, index) => index <= maxItensIndexOnScreen
    && <RecomendationCard index={ index } key={ e.idMeal } recipe={ e } />);
  } if (recipes.drinks) {
    return recipes.drinks.map((e, index) => index <= maxItensIndexOnScreen
    && <RecomendationCard index={ index } key={ e.idDrink } recipe={ e } />);
  }

  return recipes;
};

export default UseRecomendationRecipes;
