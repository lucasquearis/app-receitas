import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import BtnCategory from '../../Components/BtnCategory';

function AllRecipes() {
  const { categoryMeal, categoryDrinks } = useContext(ContextApp);

  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');

  return (
    <div>
      <Header title={ currentRout ? 'Comidas' : 'Bebidas' } />
      <BtnCategory
        category={ currentRout ? categoryMeal : categoryDrinks }
      />
      <RecipesContainer category={ currentRout ? 'comidas' : 'bebidas' } />
      <Footer />
    </div>
  );
}

export default AllRecipes;
