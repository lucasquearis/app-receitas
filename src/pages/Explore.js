import React from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import mealIcon from '../images/mealIcon.png';
import drinkIcon from '../images/drinkIcon.png';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function Explore() {
  return (
    <>
      <HeaderNoSearch title="Explorar" />
      <div className="explore">
        <div className="explore__link-button">
          <Link data-testid="explore-food" to="/app-receitas/explorar/comidas">
            <img src={ mealIcon } className="explore__icons" alt="Explore Meal Icon" />
            <br />
            Explorar Comidas
          </Link>
        </div>
        <div className="explore__link-button">
          <Link data-testid="explore-drinks" to="/app-receitas/explorar/bebidas">
            <img src={ drinkIcon } className="explore__icons" alt="Explore Drink Icon" />
            <br />
            Explorar Bebidas
          </Link>
        </div>
      </div>
      <BottomMenu />
    </>
  );
}
