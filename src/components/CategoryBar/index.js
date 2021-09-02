import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';

import { ButtonsWrapper, Button } from './style';

function CategoryBar({ categoriesList }) {
  const {
    selectedCategory,
    setSelectedCategory,
    setSelectedIngredient,
  } = useContext(AppContext);

  return (
    <ButtonsWrapper>
      <Button
        data-testid="All-category-filter"
        key="category-filter-all"
        onClick={ () => {
          setSelectedCategory('');
          setSelectedIngredient('');
        } }
        type="button"
      >
        All
      </Button>
      {categoriesList.map(({ strCategory }, index) => {
        const categoriesListLimit = 5;

        if (index < categoriesListLimit) {
          return (
            <Button
              data-testid={ `${strCategory}-category-filter` }
              key={ `category-filter-${index}` }
              onClick={ () => {
                const checkedCate = (selectedCategory === strCategory) ? '' : strCategory;
                setSelectedCategory(checkedCate);
              } }
              type="button"
            >
              { strCategory }
            </Button>
          );
        }
        return null;
      })}
    </ButtonsWrapper>
  );
}

CategoryBar.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryBar;
