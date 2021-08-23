import React from 'react';
import {
  Footer,
  Header,
} from '../components';

const ExploreFoodsIngredients = () => {
  const pageName = 'Explorar Ingredientes';
  return (
    <div>
      <Header page={ pageName } />
      Explorar Ingredientes de Comidas
      <Footer />
    </div>
  );
};

export default ExploreFoodsIngredients;
