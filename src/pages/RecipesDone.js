import React, { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Card from '../components/RecipesDone/Card';
import './RecipesDone.css';

function RecipesDone() {
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filter, setFilter] = useState('All');
  let filteredArray = getDoneRecipes;

  switch (filter) {
  case 'Food':
    filteredArray = getDoneRecipes.filter((item) => item.type === 'comida');
    break;
  case 'Drink':
    filteredArray = getDoneRecipes.filter((item) => item.type === 'bebida');
    break;
  default:
    filteredArray = getDoneRecipes;
  }

  return (
    <div className="rd-container">
      <Header title="Receitas Feitas" />
      <div className="rd-btns-container">
        <Button
          type="button"
          name="All"
          testId="filter-by-all-btn"
          className="rd-btn"
          onClick={ () => setFilter('All') }
        />
        <Button
          type="button"
          name="Food"
          testId="filter-by-food-btn"
          className="rd-btn"
          onClick={ () => setFilter('Food') }
        />
        <Button
          type="button"
          name="Drink"
          testId="filter-by-drink-btn"
          className="rd-btn"
          onClick={ () => setFilter('Drink') }
        />
      </div>
      {filteredArray.map((item, i) => {
        if (item.type === 'comida') {
          return (<Card
            key={ i }
            id={ item.id }
            categoria={ item.category }
            name={ item.name }
            date={ item.doneDate }
            tags={ item.tags }
            imgSrc={ item.image }
            type={ item.type }
            index={ i }
            area={ item.area }
          />
          );
        }
        return (<Card
          key={ i }
          id={ item.id }
          categoria={ item.alcoholicOrNot }
          name={ item.name }
          date={ item.doneDate }
          tags={ item.tags }
          imgSrc={ item.image }
          type={ item.type }
          index={ i }
          area={ item.area }
        />
        );
      })}
    </div>
  );
}

export default RecipesDone;
