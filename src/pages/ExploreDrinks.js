import React from 'react';
import './pageCSS/ExploreDrinks.css';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function ExploreDrinks() {
  return (
    <>
      <HeaderNoSearch title="Explorar Bebidas" />
      <BottomMenu />
    </>
  );
}
