import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import Food from '../../Components/Food';

function Drinks() {
  const { drinks } = useContext(ContextApp);
  return (
    <div>
      <Header title="Bebidas" />
      <RecipesContainer />
      <Food recipes={ drinks } />
      <Footer />
    </div>
  );
}

export default Drinks;
