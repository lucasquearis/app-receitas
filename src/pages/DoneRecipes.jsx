import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';

export default function DoneRecipes() {
  const food = useSelector((state) => state.doneRecipes.food);
  const drink = useSelector((state) => state.doneRecipes.drink);
  const [data, setData] = useState([...drink, ...food]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (filter === 'All') {
      setData([...drink, ...food]);
    } else if (filter === 'Food') {
      setData(food);
    } else {
      setData(drink);
    }
  }, [filter, food, drink]);

  return (
    <div>
      <section>
        <Header showExploreIcon pageTitle="Receitas Feitas" />
      </section>
      <Button
        variant="light"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All
      </Button>
      <Button
        variant="light"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('Food') }
      >
        Food
      </Button>
      <Button
        variant="light"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('Drinks') }
      >
        Drinks
      </Button>
      {data.map((recipe) => (
        <CardDoneRecipes
          key={ recipe.id }
          id={ recipe.id }
          type={ recipe.type }
          thumb={ recipe.image }
          title={ recipe.name }
          category={ recipe.category }
          area={ recipe.area }
          date={ recipe.doneDate }
          tags={ recipe.tags }
        />
      ))}
    </div>
  );
}
