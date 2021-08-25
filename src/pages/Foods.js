import React from 'react';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import meals from '../components/mocks/meals';
import FilterButton from '../components/FilterButton';

function Foods() {
  const cards = [];
  const maxCards = 12;
  for (let index = 0; index < maxCards; index += 1) {
    cards.push(<FoodCard meal={ meals.meals[index] } index={ index } />);
  }

  const filterButtons = [];
  const maxButtons = 5;
  for (let index = 0; index < maxButtons; index += 1) {
    filterButtons.push(<FilterButton categoryName={  } />);
  }

  return (
    <div>
      <Header name="Comidas" search />
      { filterButtons }
      { cards }
    </div>
  );
}

export default Foods;
