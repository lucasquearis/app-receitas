import React from 'react';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import './pageCSS/Meals.css';

export default function Meals() {
  return (
    <div className="meals-div">
      <Header title="Comidas" />
      <BottomMenu />
    </div>
  );
}
