import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ContextApp } from '../../Context/ContextApp';
import CategoryHook from '../../Hooks/CategoryHook';
import Btn from '../Btn';

const BtnCategory = ({ category }) => {
  const maxCategory = 5;
  const { recipeCategory } = useContext(ContextApp);
  const { handleCatClick, resetFilter } = CategoryHook();

  if (!recipeCategory[category]) {
    return <h2>Getting Categories...</h2>;
  }

  const btnAllProps = {
    type: 'button',
    name: 'All',
    key: 'All',
    value: 'All',
    'data-testid': 'All-category-filter',
    onClick: resetFilter,
    variant: 'contained',
  };
  const btnCategoryProps = {
    variant: 'contained',
    type: 'button',
  };

  return (
    <div>
      <Btn { ...btnAllProps } />
      {recipeCategory[category].slice(0, maxCategory).map(({ strCategory }) => (
        <Btn
          { ...btnCategoryProps }
          name={ strCategory }
          key={ strCategory }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleCatClick(strCategory, category) }
        />))}
    </div>
  );
};

BtnCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default BtnCategory;
