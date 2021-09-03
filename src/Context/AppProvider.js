import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchMeals, fetchMealsCategories } from '../Services/fetchMeals';
import { fetchCocktails, fetchCocktailsCategories } from '../Services/fetchCocktails';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [ingredientFilter, setIngredientFilter] = useState('');
  const [foodOrDrink, setFoodOrDrink] = useState('');
  const [madeRecipe, setMadeRecipe] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [search, setSearch] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);

  const globalState = {
    email: userEmail,
    meals,
    drinks,
    mealsCategories,
    drinksCategories,
    madeRecipe,
    ingredientFilter,
    foodOrDrink,
    search,
    loadSearch,
  };

  const contextValue = {
    globalState,
    setUserEmail,
    setMadeRecipe,
    setSearch,
    setLoadSearch,
    setIngredientFilter,
    setFoodOrDrink,
  };

  useEffect(() => {
    const getMealsAndDrinks = async () => {
      const mealsApi = await fetchMeals();
      const drinksApi = await fetchCocktails();
      const mealsCategoriesApi = await fetchMealsCategories();
      const drinksCategoriesApi = await fetchCocktailsCategories();

      setMeals(mealsApi);
      setDrinks(drinksApi);
      setMealsCategories(mealsCategoriesApi);
      setDrinksCategories(drinksCategoriesApi);
    };

    getMealsAndDrinks();
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
