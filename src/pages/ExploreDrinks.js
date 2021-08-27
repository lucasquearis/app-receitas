import React from 'react';
import { Footer, Header } from '../components';
import ExploreCard from '../components/ExploreCard';

const ExploreDrinks = () => {
  const pageName = 'Explorar Bebidas';
  return (
    <div>
      <Header page={ pageName } />
      <ExploreCard type="ingredientDrink" />
      <ExploreCard type="surpriseMeDrink" />
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
