import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import { getDataFromLocalStorage } from '../helpers/saveOnLocalStorage';

export default function FavoriteRecipes() {
  const favoriteRecipes = getDataFromLocalStorage('favoriteRecipes');
  return (
    <section>
      <Header
        showExploreIcon
        pageTitle="Receitas Favoritas"
        onClickShowInput={ () => {} }
      />
      <Button data-testid="filter-by-all-btn" type="button">All</Button>
      <Button data-testid="filter-by-food-btn" type="button">Food</Button>
      <Button data-testid="filter-by-drink-btn" type="button">Drinks</Button>
      {favoriteRecipes.map((recipe, index) => (
        <FavoriteCard
          key={ recipe.id }
          category={ `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
          title={ recipe.name }
          img={ recipe.image }
          index={ index }
          recipe={ recipe }
        />
      ))}
      <Card />
    </section>
  );
}
