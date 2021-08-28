import React from 'react';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/ExploreDrinks.css';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function ExploreDrinks() {
  return (
    <>
      <HeaderNoSearch title="Explorar Bebidas" />
      <BottomMenu />
    </>
  );
}
