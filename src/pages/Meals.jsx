import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';

export default function Meals() {
  return (
    <span>
      <Header title="Comidas" searchIcon={ searchIcon } />
      Page Meals
    </span>
  );
}
