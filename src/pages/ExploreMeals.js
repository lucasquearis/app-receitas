import React from 'react';
import './pageCSS/ExploreMeals.css';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function ExploreMeals() {
  return (
    <>
      <HeaderNoSearch title="Explorar Comidas" />
      <BottomMenu />
    </>
  );
}
