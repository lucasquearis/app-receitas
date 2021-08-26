import React from 'react';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" />
      <RecipesContainer />
      <Footer />
    </div>
  );
}

export default Drinks;
