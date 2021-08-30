import React from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div>
      <section>
        <Header showExploreIcon pageTitle="Receitas Feitas" />
      </section>
      <Button
        variant="light"
        data-testid="filter-by-all-btn"
        onClick={ () => console.log('All') }
      >
        All
      </Button>
      <Button
        variant="light"
        data-testid="filter-by-food-btn"
        onClick={ () => console.log('Food') }
      >
        Food
      </Button>
      <Button
        variant="light"
        data-testid="filter-by-drink-btn"
        onClick={ () => console.log('Drinks') }
      >
        Drinks
      </Button>
    </div>
  );
}
