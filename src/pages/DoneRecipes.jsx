import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import { getDataFromLocalStorage } from '../helpers/saveOnLocalStorage';

export default function DoneRecipes() {
  const recipes = getDataFromLocalStorage('doneRecipes');
  const [data, setData] = useState(recipes);
  // const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (filter === 'All') {
      setData(recipes);
    } else if (filter === 'Food') {
      setData(recipes.filter((recipe) => recipe.type === 'comida'));
    } else {
      setData(recipes.filter((recipe) => recipe.type === 'bebida'));
    }
  }, [filter]);

  return (
    <div className="body">
      <Header showExploreIcon pageTitle="Receitas Feitas" />
      <main className="d-flex flex-column w-100 p-3">
        <div className="d-flex justify-content-around pb-2">
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('All') }
          >
            All
          </Button>
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('Food') }
          >
            Food
          </Button>
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('Drinks') }
          >
            Drinks
          </Button>
        </div>
        {data.map((recipe, index) => (
          <CardDoneRecipes
            key={ recipe.id }
            id={ recipe.id }
            type={ recipe.type }
            thumb={ recipe.image }
            title={ recipe.name }
            category={ `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
            date={ recipe.doneDate }
            tags={ recipe.tags }
            index={ index }
          />
        ))}
      </main>
    </div>
  );
}
