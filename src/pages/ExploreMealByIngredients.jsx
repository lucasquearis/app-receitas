import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientsMealsCards from '../components/ExploreIngredientsMealsCards';

export default function ExploreMealByIngredients() {
  return (
    <main>
      <Header title="Explorar Ingredientes" />
      <ExploreIngredientsMealsCards />
      <Footer />
    </main>
  );
}
