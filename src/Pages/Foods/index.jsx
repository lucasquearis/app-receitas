import React from 'react';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';
import Food from '../../Components/Food';

function Foods() {
  return (
    <div>
      <Header title="Comidas" />
      <RecipesContainer />
      <Food />
      <Footer />
    </div>
  );
}

export default Foods;
