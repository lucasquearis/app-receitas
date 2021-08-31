import React, { useState } from 'react';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';
import FilterButtons from '../components/FilterButtons';

function RecipesDone() {
  const [filterRecipesDone, setfilterRecipesDone] = useState({
    filterMeals: false,
    filterDrinks: false,
  });
  const { filterMeals, filterDrinks } = filterRecipesDone;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const recipesDone = () => {
    if (filterMeals) return doneRecipes.filter(({ type }) => type === 'comida');
    if (filterDrinks) return doneRecipes.filter(({ type }) => type === 'bebida');
    return doneRecipes;
  };

  const renderFilterRecipesDone = () => (
    <section>
      {
        recipesDone().map(({
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags },
        index) => (
          <RecipeDoneCard
            key={ +id }
            id={ +id }
            type={ type }
            area={ area }
            category={ category }
            alcoholicOrNot={ alcoholicOrNot }
            name={ name }
            image={ image }
            doneDate={ doneDate }
            tagsName={ tags }
            index={ +index }
          />
        ))
      }
    </section>
  );

  return (
    <>
      <Header title="Receitas Feitas" search={ false } />
      <main>
        <FilterButtons setFilterRecipes={ setfilterRecipesDone } />
        ;
        { renderFilterRecipesDone() }
      </main>
    </>
  );
}

export default RecipesDone;
