import React from 'react';
import {
  Footer,
  Header,
} from '../components';

const ExploreDrinksIngredients = () => {
  const pageName = 'Explorar Ingredientes';

  return (
    <div>
      <Header page={ pageName } />
      Explorar Ingredientes de Drinks
      <Footer />
    </div>
  );
};

export default ExploreDrinksIngredients;
