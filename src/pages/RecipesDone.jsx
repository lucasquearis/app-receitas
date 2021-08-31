import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';

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

  const renderFilterButtons = () => (
    <section>
      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setfilterRecipesDone({
          filterMeals: true,
          filterDrinks: false,
        }) }
      >
        Food
      </Button>

      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setfilterRecipesDone({
          filterMeals: false,
          filterDrinks: true,
        }) }
      >
        Drinks
      </Button>

      <Button
        variant="primary"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setfilterRecipesDone({
          filterMeals: false,
          filterDrinks: false,
        }) }
      >
        All
      </Button>
    </section>
  );

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
      <Header title="Refeitas Feitas" />
      <main>
        { renderFilterButtons() }
        { renderFilterRecipesDone() }
      </main>
    </>
  );
}

export default RecipesDone;
