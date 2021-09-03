import React from 'react';
import UseFavoriteRecipes from '../hook/UseFavoriteRecipes';
import { Header, FavoriteCard } from '../components';
import { FavoriteList, FavoriteMain,
  ButtonFilterDiv, FilterButton } from '../UI globalStyles';

function FavoriteRecipes() {
  const {
    filteredFav,
    allFilter,
    mealFilter,
    drinkFilter,
    removeFavFromLocal } = UseFavoriteRecipes();

  return (
    <FavoriteMain>
      <Header title="Receitas Favoritas" />
      <ButtonFilterDiv>
        <FilterButton type="button" data-testid="filter-by-all-btn" onClick={ allFilter }>
          All
        </FilterButton>
        <FilterButton
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ mealFilter }
        >
          Food
        </FilterButton>
        <FilterButton
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ drinkFilter }
        >
          Drinks
        </FilterButton>
      </ButtonFilterDiv>
      <FavoriteList>
        {(filteredFav) ? filteredFav.map((recipe, index) => (
          <FavoriteCard
            key={ index }
            recipe={ recipe }
            cardIndex={ index }
            handleClick={ removeFavFromLocal }
          />)) : <h1>Você não tem receitas favoritas ainda!</h1>}
      </FavoriteList>
    </FavoriteMain>
  );
}

export default FavoriteRecipes;
