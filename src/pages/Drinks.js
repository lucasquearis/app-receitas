import React, { useContext } from 'react';
import HeaderDrinks from '../components/HeaderDrinks';
import DrinksCard from '../components/DrinksCard';
import DrinksContext from '../context/DrinksContext';
import './drinks.css';
import '../components/drinksCard.css';
import FooterMenu from '../components/FooterMenu';
import ButtonCategoriesDrinks from '../components/ButtonCategoriesDrinks';

const Drinks = () => {
  const { drinks, categoriesDrinks } = useContext(DrinksContext);
  const DRINKS = 12;

  return (
    <div className="container">
      <HeaderDrinks />

      <ButtonCategoriesDrinks categories={ categoriesDrinks } />

      <div className="drinks-container">
        {console.log(drinks)}
        {drinks && drinks.slice(0, DRINKS)
          .map((drink, index) => (
            <DrinksCard
              key={ index }
              index={ index }
              drink={ drink }
            />
          ))}
      </div>
      <FooterMenu />
    </div>
  );
};

export default Drinks;
