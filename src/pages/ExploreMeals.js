import React from 'react';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreMeals.css';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function ExploreMeals() {
  return (
    <>
      <HeaderNoSearch title="Explorar Comidas" />
      <BottomMenu />
    </>
  );
}
