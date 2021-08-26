import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import Food from '../../Components/Food';

function Foods() {
  const { meal } = useContext(ContextApp);
  return (
    <div>
      <Header title="Comidas" />
      <RecipesContainer />
      <Food recipes={ meal } />
      <Footer />
    </div>
  );
}

export default Foods;
