import React from 'react';
import DrinksCards from '../components/DrinksCards';
import DrinkCategoryButtons from '../components/DrinkCategoryButtons';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';
import '../styles/Drinks.css';

export default function Drinks() {
  return (
    <main>
      <Header title="Bebidas" searchIcon={ searchIcon } />
      <div className="main-content-wrapper">
        <DrinkCategoryButtons />
        <DrinksCards />
      </div>
      <Footer />
    </main>
  );
}
