import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

import Card from './Card';

function CardsList() {
  const { pathname } = useLocation();
  const pathIsMeals = (pathname.includes('comidas'));

  const { recipes, isLoading } = useContext(AppContext);

  const renderCards = () => recipes.map((recipe, index) => {
    const keyType = (pathIsMeals) ? 'Meal' : 'Drink';
    const recipesListLimit = 12;
    if (index < recipesListLimit && recipe[`id${keyType}`]) {
      const urlInitialPart = (pathname.includes('comidas')) ? 'comidas' : 'bebidas';
      return (
        <Link
          key={ `${keyType}-card-${index}` }
          to={ `/${urlInitialPart}/${recipe[`id${keyType}`]}` }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <Card
              img={ recipe[`str${keyType}Thumb`] }
              index={ index }
              name={ recipe[`str${keyType}`] }
            />
          </div>
        </Link>
      );
    }
    return null;
  });

  return (
    <div>
      { isLoading ? <h1>Loading...</h1> : renderCards() }
    </div>
  );
}

export default CardsList;
