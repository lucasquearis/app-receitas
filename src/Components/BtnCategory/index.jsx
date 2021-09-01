import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextApp } from '../../Context/ContextApp';

const BtnCategory = () => {
  const maxCategory = 5;
  const { searchRecipes, setRecipes, recipeCategory } = useContext(ContextApp);

  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');
  const url = currentRout ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
  const category = currentRout ? recipeCategory.meals : recipeCategory.drinks;
  const [currentCategory, setCurrentCategory] = useState('');

  if (!(recipeCategory.meals && recipeCategory.drinks)) {
    return <h2>Getting Categories...</h2>;
  }
  const returnAll = () => {
    setRecipes([]);
  };
  return (
    <div>
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
          key={ strCategory }
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

export default BtnCategory;
