import React from 'react';
import Header from '../components/Header';
import ExploreRecipe from '../components/ExploreRecipe';
import Footer from '../components/Footer';

function ExplorarComidas() {
  return (
    <div>
      <Header titulo="Explorar Comidas" />
      <ExploreRecipe />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
