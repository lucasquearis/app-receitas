import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export default function DrinkCategories() {
  const drinkCategoriesList = useSelector(({ drinkReducer }) => (
    drinkReducer.drinkCategoriesList));
  return (
    <div>
      <Button
        data-testid="All-category-filter"
        className="category-button"
      >
        All
      </Button>
      {drinkCategoriesList.map((categorie) => (
        <Button
          data-testid={ `${categorie.strCategory}-category-filter` }
          className="category-button"
          key={ categorie.strCategory }
        >
          {categorie.strCategory}
        </Button>
      ))}
    </div>
  );
}
