import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import BtnCategory from '../../Components/BtnCategory';

function AllRecipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');
  return (
    <div>
      <Header title={ currentRout ? 'Comidas' : 'Bebidas' } />
      <BtnCategory />
      <RecipesContainer category={ currentRout ? 'meals' : 'drinks' } />
      <Footer />
    </div>
  );
}

export default AllRecipes;
