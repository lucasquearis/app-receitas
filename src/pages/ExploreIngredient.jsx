import React from 'react';
import Header from '../components/Header';
import Ingredients from '../components/Ingredients';

export default function ExploreIngredient() {
  return (
    <section>
      <Header showExploreIcon pageTitle="Explorar Ingredientes" />
      <Ingredients />
    </section>
  );
}
