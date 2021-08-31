import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';

function ReceitasFeitas() {
  const [showDoneRecipes, setShowDoneRecipes] = useState([]);

  const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const showDoneFoods = allRecipes.filter((recipe) => recipe.type === 'comida');
  const showDoneDrinks = allRecipes.filter((recipe) => recipe.type === 'bebida');

  useEffect(() => {
    setShowDoneRecipes(allRecipes);
  }, []);

  const showRecipes = ({ target: { name } }) => {
    if (name === 'comida') return setShowDoneRecipes(showDoneFoods);
    if (name === 'bebida') return setShowDoneRecipes(showDoneDrinks);
    if (name === 'all') return setShowDoneRecipes(allRecipes);
  };

  return (
    <>
      <Header titulo="Receitas Feitas" />
      <button
        name="all"
        type="button"
        onClick={ showRecipes }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        name="comida"
        type="button"
        onClick={ showRecipes }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        name="bebida"
        type="button"
        onClick={ showRecipes }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        showDoneRecipes.map((recipe, index) => (
          <DoneCard
            key={ recipe.name }
            recipe={ recipe }
            index={ index }
          />
        ))
      }
    </>
  );
}

export default ReceitasFeitas;
