import React, { useEffect, useState } from 'react';
import FinishedDrinkCard from '../components/FinishedDrinkCard';
import FinishedMealCard from '../components/FinishedMealCard';
import Header from '../components/Header';

function RecipesMade() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getInfo = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getInfo) {
      setRecipes(getInfo);
    }
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" showRender={ false } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      { recipes.map((item, index) => {
        let card;
        if (item.type === 'comida') {
          card = <FinishedMealCard key={ index } card={ item } index={ index } />;
        } else {
          card = <FinishedDrinkCard key={ index } card={ item } index={ index } />;
        }
        return card;
      }) }
    </div>
  );
}

export default RecipesMade;
