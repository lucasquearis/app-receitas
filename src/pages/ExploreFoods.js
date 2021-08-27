import React from 'react';
import ExploreCard from '../components/ExploreCard';
import { Footer, Header } from '../components';

const ExploreFoods = () => {
  const pageName = 'Explorar Comidas';
  return (
    <div>
      <Header page={ pageName } />
      <ExploreCard type="ingredientFood" />
      <ExploreCard type="local" />
      <ExploreCard type="surpriseMeFood" />
      <Footer />
    </div>
  );
};

export default ExploreFoods;
