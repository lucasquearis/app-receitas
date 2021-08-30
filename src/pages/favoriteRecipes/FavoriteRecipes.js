import React, { useEffect, useState } from 'react';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';
import FavoriteRecipe from '../../components/FavoriteRecipe/FavoriteRecipe';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState();

  useEffect(() => {
    const getFavoriteRecipes = () => {
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(savedRecipes);
    };
    getFavoriteRecipes();
  }, []);

  if (favoriteRecipes) {
    return (
      <div>
        <HeaderWithoutSearch>Receitas Favoritas</HeaderWithoutSearch>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        { favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipe
            key={ index }
            index={ index }
            id={ recipe.id }
            type={ recipe.type }
            name={ recipe.name }
            image={ recipe.image }
            category={ recipe.category }
            area={ recipe.area }
            alcoholic={ recipe.alcoholicOrNot }
          />
        )) }
      </div>
    );
  }
  return (
    <div>
      <HeaderWithoutSearch>Receitas Favoritas</HeaderWithoutSearch>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    </div>
  );
};

export default FavoriteRecipes;
