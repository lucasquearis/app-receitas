import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CookedRecipesCard from '../components/CookedRecipesCard';
import Header from '../components/Header';
import './CookedRecipies.css';

function CookedRecipies() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const local = JSON.parse(localStorage.getItem('doneRecipes'));
  useEffect(() => {
    setDoneRecipes(local);
  }, []);

  const filterAll = () => {
    setDoneRecipes(local);
  };

  const filterType = (type) => {
    const filteredFood = doneRecipes.filter((item) => item.type === type);
    setDoneRecipes(filteredFood);
  };

  if (!doneRecipes) {
    return (
      <>
        <Header title="Receitas Feitas" />
        <h1>ERRO</h1>
      </>
    );
  }
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="btn-cooked-recip">
        <Button
          onClick={ filterAll }
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          data-testid="filter-by-food-btn"
          onClick={ () => filterType('comida') }
        >
          Food
        </Button>
        <Button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterType('bebida') }
        >
          Drinks
        </Button>
      </div>
      {doneRecipes.map((item, index) => (
        <CookedRecipesCard
          key={ item.id }
          index={ index }
          id={ item.id }
          type={ item.type }
          category={ item.category }
          alcoholicOrNot={ item.alcoholicOrNot }
          name={ item.name }
          image={ item.image }
          doneDate={ item.doneDate }
          tags={ item.tags }
          area={ item.area }
        />))}
    </div>
  );
}

export default CookedRecipies;
