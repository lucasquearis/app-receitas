import React, { useContext } from 'react';
import HeaderDrinks from '../components/HeaderDrinks';
import DrinksCard from '../components/DrinksCard';
import DrinksContext from '../context/DrinksContext';
import './drinks.css';
import '../components/drinksCard.css';

const Drinks = () => {
  const { drinks } = useContext(DrinksContext);
  const DRINKS = 12;

  return (
    <div className="container">
      <HeaderDrinks />
      <div className="drinks-container">
        {drinks && drinks.slice(0, DRINKS)
          .map((drink, index) => (
            <DrinksCard
              key={ index }
              index={ index }
              drink={ drink }
            />
          ))}
      </div>
    </div>
  );
};

export default Drinks;
