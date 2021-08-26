import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import Recipes from '../components/Recipes';
import DrinkCard from '../components/DrinkCard';
import Context from '../context/Context';
import DrinkFilterButton from '../components/DrinkFilterButton';

function Drinks() {
  const { drinkRecipes,
    drinkCategories: { loading },
    requestCategory,
    setDrinkRecipes,
    setDrinkCategories,
    drinkCategoryAPI } = useContext(Context);
  const { list: recipes } = drinkRecipes;
  const { loading: loadcard } = drinkRecipes;

  useEffect(() => {
    if (loadcard) {
      requestCategory('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setDrinkRecipes);
      requestCategory(drinkCategoryAPI, setDrinkCategories);
    }
  });

  const cards = [];
  const maxCards = 12;
  for (let index = 0; index < maxCards; index += 1) {
    if (loadcard === false) {
      cards.push(<DrinkCard drink={ recipes.drinks[index] } index={ index } />);
    }
  }

  const drinkPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Bebidas" name="cocktail" search />
          <DrinkFilterButton />
          { cards }
          <MenuInferior />
          <Recipes />
        </div>
      );
    }
  };

  return (
    <main>
      { drinkPage(loading) }
    </main>
  );
}
