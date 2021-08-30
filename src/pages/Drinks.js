import React, { useContext, useEffect, useState } from 'react';
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
  const INITIAL_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [API, setAPI] = useState('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    requestCategory(API, setDrinkRecipes);
    requestCategory(drinkCategoryAPI, setDrinkCategories);
  }, [API]);

  if (loadcard) return <p>carregando...</p>;

  const cards = [];
  const maxCards = 11;
  for (let index = 0; index < recipes.drinks.length; index += 1) {
    if (loadcard === false) {
      cards.push(<DrinkCard drink={ recipes.drinks[index] } index={ index } />);
    }
  }

  const handleClick = ({ target: { innerText } }) => {
    if (filter === innerText) {
      setFilter('All');
      return setAPI(INITIAL_API);
    }
    setAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${innerText}`);
    setFilter(innerText);
    setDrinkRecipes({ ...drinkRecipes, loading: true });
  };

  const drinkPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Bebidas" name="cocktail" search />
          <DrinkFilterButton onClick={ handleClick } toggle={ filter } />
          { cards.filter((e, index) => index <= maxCards) }
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

export default Drinks;
