import React from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import drinks from '../components/mocks/drinks';

function Drinks() {
  const cards = [];
  const maxCards = 12;
  for (let index = 0; index < maxCards; index += 1) {
    cards.push(<DrinkCard drink={ drinks.drinks[index] } index={ index } />);
  }

  const filterButtons = [];
  const maxButtons = 5;
  for (let index = 0; index < maxButtons; index += 1) {
    filterButtons.push(<FilterButton categoryName={  } />);
  }
  
  return (
    <div>
      <Header name="Bebidas" search />
      { filterButtons }
      { cards }
    </div>
  );
}

export default Drinks;
