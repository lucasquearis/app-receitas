import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';
import './receitasFeitas.css';

function ReceitasFeitas() {
  const [showDoneRecipes, setShowDoneRecipes] = useState([]);

  let allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (allRecipes === null) {
    allRecipes = [];
  }
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
    <div className="main-container">
      <Header titulo="Receitas Feitas" />
      <div className="favorite-btn-container">
        <Button
          variant="outline-warning"
          name="all"
          type="button"
          onClick={ showRecipes }
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          variant="outline-warning"
          name="comida"
          type="button"
          onClick={ showRecipes }
          data-testid="filter-by-food-btn"
        >
          Food
        </Button>
        <Button
          variant="outline-warning"
          name="bebida"
          type="button"
          onClick={ showRecipes }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
      </div>
      <div className="card-container">
        {
          showDoneRecipes.map((recipe, index) => (
            <DoneCard
              key={ recipe.name }
              recipe={ recipe }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
