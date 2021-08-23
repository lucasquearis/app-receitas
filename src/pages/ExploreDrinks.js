import React from 'react';
import {
  Footer,
  Header,
} from '../components';

const ExploreDrinks = () => {
  const pageName = 'Explorar Bebidas';
  return (
    <div>
      <Header page={ pageName } />
      Explorar Drinks
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
