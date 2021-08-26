import React from 'react';
import FoodList from '../components/FoodList';
import Footer from '../components/Footer';
import Header from '../components/Header';

function MainFoods() {
  return (
    <div>
      <Header name="Comidas" />
      <FoodList />
      <Footer />
    </div>
  );
}

export default MainFoods;
