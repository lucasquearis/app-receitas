import React, { useContext } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import Context from '../context/Context';
import DrinkFilterButton from '../components/DrinkFilterButton';

function Drinks() {
  const { drinkRecipes, drinkCategories: { loading } } = useContext(Context);
  const { list: recipes } = drinkRecipes;
  const { loading: loadcard } = drinkRecipes;

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
