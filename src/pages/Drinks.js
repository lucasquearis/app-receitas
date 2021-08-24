import React from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import drinks from '../components/mocks/drinks';

function Drinks() {
  const Cards = [];
  const maxCards = 12;
  for (let index = 0; index < maxCards; index += 1) {
    Cards.push(<DrinkCard drink={ drinks.drinks[index] } index={ index } />);
  }
  return (
    <div>
      <Header name="Bebidas" search />
      { Cards }
    </div>
  );
}

export default Drinks;
