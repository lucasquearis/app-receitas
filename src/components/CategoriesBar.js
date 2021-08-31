import React, { useState, useEffect, useContext } from 'react';
import { fetchMealsCategory } from '../services/requestMealsAPI';
import { fetchDrinksCategory } from '../services/requestDrinksAPI';
import Context from '../context/Context';

function CategoriesBar() {
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const { recipeType } = useContext(Context);

  useEffect(() => {
    async function fetchCategory() {
      if (recipeType === 'meals') {
        const responseMeals = await fetchMealsCategory();
        setMealsCategory(responseMeals);
      } else {
        const responseCocktails = await fetchDrinksCategory();
        setDrinksCategory(responseCocktails);
      }
    }
    fetchCategory();
  }, [recipeType]);

  function RenderCategoryButtons(strCategory, index) {
    return (
      <button
        key={ index }
        data-testid={ `${strCategory}-category-filter` }
        type="button"
      >
        { strCategory }
      </button>
    );
  }

  function sendCategoryMeals() {
    return (
      mealsCategory
        .map((item, index) => {
          const { strCategory } = item;
          return RenderCategoryButtons(strCategory, index);
        })
    );
  }

  function sendCategoryDrink() {
    return (
      drinksCategory
        .map((item, index) => {
          const { strCategory } = item;
          return RenderCategoryButtons(strCategory, index);
        })
    );
  }

  return (
    <div>
      {recipeType === 'meals'
        ? sendCategoryMeals()
        : sendCategoryDrink()}
    </div>
  );
}

export default CategoriesBar;
