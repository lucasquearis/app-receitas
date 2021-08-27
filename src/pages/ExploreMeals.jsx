import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer, ExploreLinks } from '../components';

function ExploreMeals() {
  const { pathname } = useLocation();
  return (
    <div>
      <Header title="Explorar Comidas" />
      <ExploreLinks path={ pathname } />
      <Footer />
    </div>
  );
}

export default ExploreMeals;
