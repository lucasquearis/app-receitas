import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import Food from '../../Components/Food';
import BtnCategory from '../../Components/BtnCategory';

function Foods() {
  const { meal, categoryMeal } = useContext(ContextApp);
  return (
    <div>
      <Header title="Comidas" />
      <RecipesContainer />
      <BtnCategory category={ categoryMeal } />
      <Food recipes={ meal } />
      <Footer />
    </div>
  );
}

export default Foods;
