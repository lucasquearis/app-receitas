import React from 'react';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreMealsByIngredient.css';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function ExploreMealsByIngredient() {
  return (
    <>
      <HeaderNoSearch title="Explorar Ingredientes" />
      <BottomMenu />
    </>
  );
}
