import React from 'react';
import Header from '../components/Header';
import ExploreRecipes from '../components/ExploreRecipes';

export default function ExploreDrink() {
  return (
    <section>
      <Header showExploreIcon pageTitle="Explorar Bebidas" />
      <ExploreRecipes />
    </section>
  );
}
