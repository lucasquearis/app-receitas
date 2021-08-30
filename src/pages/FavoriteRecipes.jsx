import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import {
  getDataFromLocalStorage,
  saveOnLocalStorage,
} from '../helpers/saveOnLocalStorage';

export default function FavoriteRecipes() {
  const favoriteRecipes = getDataFromLocalStorage('favoriteRecipes');
  const [favRecipes, setFavRecipes] = useState(favoriteRecipes);

  const handleDelete = (favId) => {
    const filtered = favRecipes.filter((item) => item.id !== favId);
    saveOnLocalStorage('favoriteRecipes', filtered);
    setFavRecipes(favRecipes.filter((item) => item.id !== favId));
  };

  const clearFilter = () => {
    setFavRecipes(favoriteRecipes);
  };

  const handleFoodFilter = () => {
    setFavRecipes(favRecipes.filter((data) => data.type === 'comida'));
  };

  const handleDrinkFilter = () => {
    setFavRecipes(favRecipes.filter((data) => data.type === 'bebida'));
  };

  console.log(favRecipes.filter((data) => data.type === 'comida'));

  return (
    <section>
      <Header
        showExploreIcon
        pageTitle="Receitas Favoritas"
        onClickShowInput={ () => {} }
      />
      <Button
        onClick={ clearFilter }
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </Button>
      <Button
        onClick={ handleFoodFilter }
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </Button>
      <Button
        onClick={ handleDrinkFilter }
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </Button>
      {favRecipes.map((recipe, index) => (
        <FavoriteCard
          key={ recipe.id }
          category={ `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
          title={ recipe.name }
          img={ recipe.image }
          index={ index }
          recipes={ recipe }
          handleDelete={ () => handleDelete(recipe.id) }
        />
      ))}
    </section>
  );
}
