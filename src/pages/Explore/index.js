import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { fetchApi, MEALS_LIST, MEALS_BY_AREA } from '../../services';

import Header from '../../components/Header';
import FooterBar from '../../components/FooterBar';
import MainContent from './MainContent';
import MealsOrDrinks from './MealsOrDrinks';
import AreaFilterBar from './AreaFilterBar';
import RecipesList from '../../components/RecipesList';
import IngrendientsList from './IngredientsList';

function Explorar() {
  const { pathname } = useLocation();

  const { selectedArea, setIsLoading, setRecipes } = useContext(AppContext);

  useEffect(() => {
    const getRecipes = async () => {
      const endPoint = (selectedArea) ? `${MEALS_BY_AREA}${selectedArea}` : MEALS_LIST;
      const { meals } = await fetchApi(endPoint);
      setRecipes(meals);
      setIsLoading(false);
    };

    setIsLoading(true);

    getRecipes();
  }, [selectedArea, setIsLoading, setRecipes]);

  return (
    <>
      <Header
        showSearchBtn={ (pathname.includes('area')) }
      />
      {(pathname === '/explorar') && <MainContent />}
      {(pathname.includes('area')) && (
        <>
          <AreaFilterBar />
          <RecipesList />
        </>
      )}
      <MealsOrDrinks />
      {(pathname.includes('ingredientes')) && <IngrendientsList />}
      <FooterBar />
    </>
  );
}

export default Explorar;
