import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import Food from '../../Components/Food';
import BtnCategory from '../../Components/BtnCategory';

function Drinks() {
  const { drinks, categoryDrinks } = useContext(ContextApp);
  return (
    <div>
      <Header title="Bebidas" />
      <RecipesContainer />
      <BtnCategory category={ categoryDrinks } />
      <Food recipes={ drinks } />
      <Footer />
    </div>
  );
}

export default Drinks;
