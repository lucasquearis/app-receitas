import React from 'react';
import { Header, DoneRecipeCard } from '../components';
import UseDoneRecipes from '../hook/UseDoneRecipes';
import { DoneMain, ButtonFilterDiv,
  FilterButton, DoneRecipeList } from '../UI globalStyles';

function DoneRecipes() {
  const { filteredRecipes, resetFilter, foodFilter, drinksFilter } = UseDoneRecipes();

  return (
    <DoneMain>
      <Header title="Receitas Feitas" />
      <ButtonFilterDiv>
        <FilterButton
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ resetFilter }
        >
          All
        </FilterButton>
        <FilterButton
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ foodFilter }
        >
          Food
        </FilterButton>
        <FilterButton
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ drinksFilter }
        >
          Drinks
        </FilterButton>
      </ButtonFilterDiv>
      <DoneRecipeList>
        {filteredRecipes.map((recipe, index) => (
          <DoneRecipeCard key={ index } recipe={ recipe } cardIndex={ index } />))}
      </DoneRecipeList>
    </DoneMain>
  );
}

export default DoneRecipes;
