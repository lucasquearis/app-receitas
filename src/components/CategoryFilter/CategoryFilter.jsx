import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CategoryButton from './CategoryButton/CategoryButton';
import AllButton from './AllButton/AllButton';
import { CategorySection } from './styles';

function CategoryFilter() {
  const { pathname } = useLocation();
  const categories = useSelector(({ meals }) => meals.categories);
  const [selected, setSelected] = useState('');

  function btnMap(firstFive) {
    return (
      <CategorySection>
        <AllButton path={ pathname } selected={ selected } select={ setSelected } />
        { firstFive.map(({ strCategory }) => (
          <CategoryButton
            key={ strCategory }
            category={ strCategory }
            path={ pathname }
            selected={ selected }
            select={ setSelected }
          />)) }
      </CategorySection>
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
