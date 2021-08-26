import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
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
  setSelectedCategory,
}) { // Nome provisório
  const { showBar } = useContext(AppContext);

  const { pathname } = useLocation();
  const pathIsMeals = (pathname === '/comidas');

  const renderCards = () => recipes.map((recipe, index) => {
    const keyType = (pathIsMeals) ? 'Meal' : 'Drink';
    const recipesListLimit = 12;
    if (index < recipesListLimit) {
      return (
        <Card
          img={ recipe[`str${keyType}Thumb`] }
          index={ index }
          key={ `${keyType}-card-${index}` }
          name={ recipe[`str${keyType}`] }
        />
      );
    }
    return null;
  });

  return (
    <>
      <Header nomeDaPagina={ (pathIsMeals) ? 'Comidas' : 'Bebidas ' } />
      { showBar ? <BarraDeBusca /> : <BarraCategorias
        categoriesList={ categoriesList }
        setSelectedCategory={ setSelectedCategory }
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
  setSelectedCategory: PropTypes.func.isRequired,
};

export default EstruturaPrincipal;
