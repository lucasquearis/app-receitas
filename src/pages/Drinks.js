import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import HeaderDrinks from '../components/HeaderDrinks';
import DrinksCard from '../components/DrinksCard';
import DrinksContext from '../context/DrinksContext';
import './drinks.css';
import '../components/drinksCard.css';
import FooterMenu from '../components/FooterMenu';
import ButtonCategoriesDrinks from '../components/ButtonCategoriesDrinks';

const Drinks = () => {
  const { drinks, categoriesDrinks, drinksByCategories } = useContext(DrinksContext);
  const history = useHistory();
  const DRINKS = 12;

  if (drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (drinks.length === 1 && drinksByCategories === false) {
    history.push(`/bebidas/${drinks[0].idDrink}`);
  }

  return (
    <div className="container">
      <HeaderDrinks />

      <ButtonCategoriesDrinks categories={ categoriesDrinks } />

      <div className="drinks-container">
        {drinks && drinks.slice(0, DRINKS)
          .map((drink, index) => (
            <Link key={ index } to={ `/bebidas/${drink.idDrink}` }>
              <DrinksCard
                key={ index }
                index={ index }
                drink={ drink }
              />
            </Link>
          ))}
      </div>
      <FooterMenu />
    </div>
  );
};

export default Drinks;
