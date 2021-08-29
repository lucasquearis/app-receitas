import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import MainContent from './MainContent';
import MealsOrDrinks from './MealsOrDrinks';
import IngrendientsList from './IngredientsList';

function Explorar() {
  const { pathname } = useLocation();

  return (
    <>
      <Header
        showSearchBtn={ false }
      />
      {(pathname === '/explorar') && <MainContent />}
      <MealsOrDrinks />
      {(pathname.includes('ingredientes')) && <IngrendientsList />}
      <MenuInferior />
    </>
  );
}

export default Explorar;
