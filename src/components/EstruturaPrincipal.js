import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

import Header from './Header';
import BarraDeBusca from './BarraDeBusca';
import Card from './Card';
import MenuInferior from './MenuInferior';
import BarraCategorias from './BarraCategorias';

function EstruturaPrincipal({
  categoriesList,
  isLoading,
  recipes,
}) { // Nome provisório
  const { showBar } = useContext(AppContext);

  const { pathname } = useLocation();
  const pathIsMeals = (pathname === '/comidas');

  const renderCards = () => recipes.map((recipe, index) => {
    const keyType = (pathIsMeals) ? 'Meal' : 'Drink';
    const recipesListLimit = 12;
    if (index < recipesListLimit) {
      return (
        <Link to={ `${pathname}/${recipe[`id${keyType}`]}` }>
          <Card
            img={ recipe[`str${keyType}Thumb`] }
            index={ index }
            key={ `${keyType}-card-${index}` }
            name={ recipe[`str${keyType}`] }
          />
        </Link>
      );
    }
    return null;
  });

  return (
    <>
      <Header
        pageTitle={ (pathIsMeals) ? 'Comidas' : 'Bebidas ' }
        showSearchBtn
      />
      { showBar ? <BarraDeBusca /> : <BarraCategorias
        categoriesList={ categoriesList }
        whatIsTheType={ pathname }
      /> }
      { isLoading ? <h1>Loading...</h1> : renderCards() }

      <MenuInferior />
    </>
  );
}

EstruturaPrincipal.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EstruturaPrincipal;
