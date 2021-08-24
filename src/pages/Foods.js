import React from 'react';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import meals from '../components/mocks/meals';

function Foods() {
  let Cards = [];
  for (let index = 0; index < 12; index += 1) {
    Cards.push(<FoodCard meal={ meals.meals[index] } index={ index } />)
  };
  return (
    <div>
      <Header name="Comidas" search />
      { Cards }
    </div>
  );
}

export default Foods;
