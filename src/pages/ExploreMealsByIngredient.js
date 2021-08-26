import React from 'react';
import './pageCSS/ExploreMealsByIngredient.css';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function ExploreMealsByIngredient() {
  return (
    <>
      <HeaderNoSearch title="Explorar Ingredientes" />
      <BottomMenu />
    </>
  );
}
