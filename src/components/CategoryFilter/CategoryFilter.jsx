import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CategoryButton from './CategoryButton/CategoryButton';

function CategoryFilter() {
  const { pathname } = useLocation();
  const categories = useSelector(({ meals }) => meals.categories);

  function btnMap(firstFive) {
    return (
      <div>
        { firstFive.map(({ strCategory }) => (
          <CategoryButton
            key={ strCategory }
            category={ strCategory }
          />)) }
      </div>
    );
  }

  if (categories) {
    const { drinks, meals } = categories;
    const nCat = 5;
    if (drinks && pathname === '/bebidas') {
      const firstFive = drinks.slice(0, nCat);
      return (btnMap(firstFive));
    }
    if (meals && pathname === '/comidas') {
      const firstFive = meals.slice(0, nCat);
      return (btnMap(firstFive));
    }
  }
  return (<p>Carregando...</p>);
}

export default CategoryFilter;
