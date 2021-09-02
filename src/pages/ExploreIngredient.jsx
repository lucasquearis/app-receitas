import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Ingredients from '../components/Ingredients';

export default function ExploreIngredient() {
  return (
    <section className="body">
      <Header showExploreIcon pageTitle="Explorar Ingredientes" />
      <Ingredients />
      <Footer />
    </section>
  );
}
