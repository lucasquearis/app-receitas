import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import MainContent from './MainContent';
import MealsOrDrinks from './MealsOrDrinks';

function Explorar() {
  const { pathname } = useLocation();

  return (
    <>
      <Header
        showSearchBtn={ false }
      />
      {(pathname === '/explorar') && <MainContent />}
      <MealsOrDrinks />
      <MenuInferior />
    </>
  );
}

export default Explorar;
