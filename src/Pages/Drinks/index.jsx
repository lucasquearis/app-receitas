import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import BtnCategory from '../../Components/BtnCategory';

function Drinks() {
  const { categoryDrinks } = useContext(ContextApp);
  return (
    <div>
      <Header title="Bebidas" />
      <RecipesContainer />
      <BtnCategory category={ categoryDrinks } />
      <Footer />
    </div>
  );
}

export default Drinks;
