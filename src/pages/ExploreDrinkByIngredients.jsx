import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientsDrinksCards from '../components/ExploreIngredientsDrinksCards';

export default function ExploreDrinkByIngredients() {
  return (
    <main>
      <Header title="Explorar Ingredientes" />
      <ExploreIngredientsDrinksCards />
      <Footer />
    </main>
  );
}
