import React from 'react';
import Header from '../components/Header';
import DrinkList from '../components/DrinkList';
import Footer from '../components/Footer';

function MainDrinks() {
  return (
    <div>
      <Header name="Bebidas" />
      <DrinkList />
      <Footer />
    </div>
  );
}

export default MainDrinks;
