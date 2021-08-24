import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';

export default function Drinks() {
  return (
    <span>
      <Header title="Bebidas" searchIcon={ searchIcon } />
      Drinks
    </span>
  );
}
