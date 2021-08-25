import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderDrinks from '../components/HeaderDrinks';
import DrinksCard from '../components/DrinksCard';
import DrinksContext from '../context/DrinksContext';
import './drinks.css';
import '../components/drinksCard.css';
import FooterMenu from '../components/FooterMenu';

const Drinks = () => {
  const { drinks } = useContext(DrinksContext);
  const history = useHistory();
  const DRINKS = 12;

  if (drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (drinks.length === 1) {
    history.push(`/bebidas/${drinks[0].idDrink}`);
  }

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
      <FooterMenu />
    </div>
  );
};

export default Drinks;
