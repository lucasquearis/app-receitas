import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ContextApp } from '../../Context/ContextApp';
import './style.css';
import CategoryHook from '../../Hooks/CategoryHook';
import Btn from '../Btn';

const BtnCategory = ({ category }) => {
  const maxCategory = 5;
  const { recipeCategory } = useContext(ContextApp);
  const { handleCatClick, resetFilter } = CategoryHook();

  const [currentCategory, setCurrentCategory] = useState('All');

  if (!recipeCategory[category]) {
    return <h2>Getting Categories...</h2>;
  }

  const btnAllProps = {
    className: currentCategory === 'All' ? 'selected' : null,
    type: 'button',
    name: 'All',
    'data-testid': 'All-category-filter',
    onClick: () => {
      setCurrentCategory('All');
      resetFilter();
    },
    variant: 'contained',
  };
  const btnCategoryProps = {
    variant: 'contained',
    type: 'button',
  };

  return (
    <div className="category-container">
      <Btn { ...btnAllProps } />
      {recipeCategory[category].slice(0, maxCategory).map(({ strCategory }) => (
        <Btn
          { ...btnCategoryProps }
          name={ strCategory }
          key={ strCategory }
          value={ strCategory }
          className={ currentCategory === strCategory ? 'selected' : null }
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
