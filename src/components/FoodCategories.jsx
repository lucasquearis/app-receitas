import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export default function FoodCategories() {
  const foodCategoriesList = useSelector(({ foodReducer }) => (
    foodReducer.foodCategoriesList));
  return (
    <div>
      <Button
        data-testid="All-category-filter"
        className="category-button"
      >
        All
      </Button>
      {foodCategoriesList.map((categorie) => (
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
