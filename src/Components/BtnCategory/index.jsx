import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ContextApp } from '../../Context/ContextApp';
import './style.css';

const BtnCategory = ({ category }) => {
  const maxCategory = 5;
  const { searchRecipes, setRecipes } = useContext(ContextApp);
  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');
  const url = currentRout ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const [currentCategory, setCurrentCategory] = useState('');

  if (category === undefined) {
    return <div>loding</div>;
  }
  const returnAll = () => {
    setRecipes([]);
  };
  return (
    <div className="category-container">
      <button
        type="button"
        name="All"
        key="All"
        value="All"
        data-testid="All-category-filter"
        onClick={ returnAll }
      >
        All
      </button>
      {category.slice(0, maxCategory).map(({ strCategory }) => (
        <button
          type="button"
          name={ strCategory }
          Key={ strCategory }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ ({ target: { value } }) => {
            if (value === currentCategory) {
              return setRecipes([]);
            }
            setCurrentCategory(value);
            const searchInput = {
              type: 'category',
              input: value,
            };
            searchRecipes(searchInput, currentRout, url);
          } }
        >
          { strCategory }
        </button>))}
    </div>
  );
};

BtnCategory.propTypes = {
  category: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BtnCategory;
