import React, { useState } from 'react';
import DoneRecipesDrinks from '../components/DoneRecipesDrinks';
import DoneRecipesMeals from '../components/DoneRecipesMeals';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipesStorage, setDoneRecipesStorage] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) || [],
  );

  function filterDoneRecipes(type) {
    switch (type) {
    case 'food':
      setDoneRecipesStorage((JSON.parse(localStorage.getItem('doneRecipes')))
        .filter((recipeArr) => recipeArr.type === 'comida') || []);
      break;

    case 'drinks':
      setDoneRecipesStorage((JSON.parse(localStorage.getItem('doneRecipes')))
        .filter((recipeArr) => recipeArr.type === 'bebida') || []);
      break;

    default:
      setDoneRecipesStorage(JSON.parse(localStorage.getItem('doneRecipes')) || []);
      break;
    }
  }

  return (
    <div>
      <Header title="Receitas Feitas" hideSearch />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterDoneRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterDoneRecipes('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterDoneRecipes('drinks') }
        >
          Drinks
        </button>
      </section>
      <section>
        { doneRecipesStorage.map((recipe, index) => ((recipe.type === 'comida')
          ? <DoneRecipesMeals recipe={ recipe } index={ index } />
          : <DoneRecipesDrinks recipe={ recipe } index={ index } />))}
      </section>
    </div>
  );
}

export default DoneRecipes;
