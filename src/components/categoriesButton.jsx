import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';

const CategoriesButton = ({ food }) => {
  const { drinkCategory, foodCategory, filter, setFilter } = useContext(RecipesContext);
  const onClick = ({ target }) => {
    const toggle = (filter === target
      .value) || (target
      .value === 'All') ? '' : target.value;
    setFilter(toggle);
  };
  const foodOrDrink = food ? foodCategory : drinkCategory;
  return (
    <div className="d-flex flex-wrap">
      <Button
        className="category-btn btn btn-info"
        text="All"
        onClick={ onClick }
        testId="All-category-filter"
      />
      { foodOrDrink
        .map(({ strCategory }) => (
          <Button
            key={ strCategory }
            text={ strCategory }
            testId={ `${strCategory}-category-filter` }
            onClick={ onClick }
            className="category-btn btn btn-info" 
          />))}
    </div>
  );
};

CategoriesButton.propTypes = {
  food: PropTypes.bool.isRequired,
};

export default CategoriesButton;
