import React from 'react';
import Header from '../components/Header';
import ExploreRecipes from '../components/ExploreRecipes';

export default function ExploreFood() {
  return (
    <section>
      <Header showExploreIcon pageTitle="Explorar Comidas" />
      <ExploreRecipes foods />
    </section>
  );
}
