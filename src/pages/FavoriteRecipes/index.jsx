import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Header from '../../components/Header';
import FavoriteRecipesCard from './FavoriteRecipesCard';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );
  const drinksFilted = (!favoriteRecipes)
    ? {} : favoriteRecipes.filter((recipe) => recipe.type.includes('bebida'));
  const foodsFilted = (!favoriteRecipes)
    ? {} : favoriteRecipes.filter((recipe) => recipe.type.includes('comida'));

  const headerProps = {
    title: 'Receitas Favoritas',
    renderSearchBar: false,
  };

  const filterByBtn = () => {
    if (!favoriteRecipes) {
      return (<h3>Nenhuma Receita Favorita</h3>);
    }
    if (filter === 'comida') {
      return foodsFilted
        .map((recipe, index) => (
          <FavoriteRecipesCard
            recipe={ recipe }
            key={ index }
            index={ index }
            setFavoriteRecipes={ setFavoriteRecipes }
          />));
    } if (filter === 'bebida') {
      return drinksFilted
        .map((recipe, index) => (
          <FavoriteRecipesCard
            recipe={ recipe }
            index={ index }
            key={ index }
            setFavoriteRecipes={ setFavoriteRecipes }
          />));
    }
    return favoriteRecipes
      .map((recipe, index) => (
        <FavoriteRecipesCard
          key={ index }
          recipe={ recipe }
          index={ index }
          setFavoriteRecipes={ setFavoriteRecipes }
        />));
  };
  return (
    <div>
      <Header { ...headerProps } />
      <Button
        color="secondary"
        variant="contained"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </Button>
      <Button
        color="secondary"
        variant="contained"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </Button>
      <Button
        color="secondary"
        variant="contained"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </Button>
      { filterByBtn() }
    </div>
  );
}
export default FavoriteRecipes;
