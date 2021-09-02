import React, { useState } from 'react';
import FavoriteRecipesDrinks from '../components/FavoriteRecipesDrinks';
import FavoriteRecipesMeals from '../components/FavoriteRecipesMeals';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipesStorage, setFavoriteRecipesStorage] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  );

  function filterFavoriteRecipes(type) {
    switch (type) {
    case 'food':
      setFavoriteRecipesStorage((JSON.parse(localStorage.getItem('favoriteRecipes')))
        .filter((recipeArr) => recipeArr.type === 'comida') || []);
      break;

    case 'drinks':
      setFavoriteRecipesStorage((JSON.parse(localStorage.getItem('favoriteRecipes')))
        .filter((recipeArr) => recipeArr.type === 'bebida') || []);
      break;

    default:
      setFavoriteRecipesStorage(
        JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
      );
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
          onClick={ () => filterFavoriteRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterFavoriteRecipes('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterFavoriteRecipes('drinks') }
        >
          Drinks
        </button>
      </section>
      <section>
        { favoriteRecipesStorage.map((recipe, index) => ((recipe.type === 'comida')
          ? (
            <FavoriteRecipesMeals
              recipe={ recipe }
              index={ index }
              removeRecipe={ setFavoriteRecipesStorage }
            />)
          : (
            <FavoriteRecipesDrinks
              recipe={ recipe }
              index={ index }
              removeRecipe={ setFavoriteRecipesStorage }
            />)))}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
