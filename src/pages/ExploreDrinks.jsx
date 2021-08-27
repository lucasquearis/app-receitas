import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer, ExploreLinks } from '../components';

function ExploreDrinks() {
  const { pathname } = useLocation();
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <ExploreLinks path={ pathname } />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
