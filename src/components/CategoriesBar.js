import React, { useState, useEffect, useContext } from 'react';
import {
  fetchMealsByCategories,
  fetchMealsCategory } from '../services/requestMealsAPI';
import {
  fetchDrinksByCategories,
  fetchDrinksCategory } from '../services/requestDrinksAPI';
import Context from '../context/Context';

function CategoriesBar() {
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const {
    setCocktails,
    setMeals,
    setCategory,
    category,
    resetFilter,
    handleToggle,
    recipeType,
  } = useContext(Context);

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

  useEffect(() => {
    async function getCategories() {
      if (category !== 'All') {
        if (recipeType === 'meals') {
          const responseMeals = await fetchMealsByCategories(category);
          setMeals(responseMeals);
        } else {
          const responseDrinks = await fetchDrinksByCategories(category);
          setCocktails(responseDrinks);
        }
      }
    }
    getCategories();
  }, [category, recipeType, setMeals, setCocktails]);

  function handleClick(strCategory) {
    setCategory(strCategory);
    handleToggle(strCategory);
  }

  function renderCategoryButtons(strCategory, index) {
    return (
      <button
        key={ index }
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        onClick={ () => handleClick(strCategory) }
        id={ `${strCategory}-category-filter` }
        value={ strCategory }
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
          return renderCategoryButtons(strCategory, index);
        })
    );
  }

  function sendCategoryDrink() {
    return (
      drinksCategory
        .map((item, index) => {
          const { strCategory } = item;
          return renderCategoryButtons(strCategory, index);
        })
    );
  }

  return (
    <div>
      <button
        className="category-bar-button"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => resetFilter() }
      >
        All
      </button>
      {recipeType === 'meals'
        ? sendCategoryMeals()
        : sendCategoryDrink()}
    </div>
  );
}

export default CategoriesBar;
