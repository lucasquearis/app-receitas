import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';

const CategoriesButton = () => {
  const {
    drinkCategory,
    foodCategory,
    filter,
    setFilter,
    food } = useContext(RecipesContext);
  const onClick = ({ target }) => {
    const toggle = (filter === target
      .value) || (target
      .value === 'All') ? '' : target.value;
    setFilter(toggle);
  };
  const foodOrDrink = food ? foodCategory : drinkCategory;
  return (
    <div>
      <Button text="All" onClick={ onClick } testId="All-category-filter" />
      { foodOrDrink
        .map(({ strCategory }) => (
          <Button
            key={ strCategory }
            text={ strCategory }
            testId={ `${strCategory}-category-filter` }
            onClick={ onClick }
          />))}
    </div>
  );
};

export default CategoriesButton;
