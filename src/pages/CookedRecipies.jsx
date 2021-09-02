import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CookedRecipesCard from '../components/CookedRecipesCard';
import Header from '../components/Header';

function CookedRecipies() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const local = JSON.parse(localStorage.getItem('doneRecipes'));
  useEffect(() => {
    setDoneRecipes(local);
  }, []);
  console.log(local);

  const filterType = (type) => {
    console.log(type);
    if (type === 'all') {
      setDoneRecipes(doneRecipes);
    } else {
      const filteredFood = doneRecipes.filter((item) => item.type === type);
      setDoneRecipes(filteredFood);
    }
  };
  return (
    <div>
      <Header title="Receitas Feitas" />
      <Button
        onClick={ () => filterType('all') }
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
