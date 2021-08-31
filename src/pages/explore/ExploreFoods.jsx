import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IngredientsCard from '../../components/IngredientsCard';

export default function ExploreFoods() {
  return (
    <>
      <Header title="Explorar Comidas" />
      <IngredientsCard />
      <Footer />
    </>
  );
}
