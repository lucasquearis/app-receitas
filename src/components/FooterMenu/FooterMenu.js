import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './FooterMenu.css';

const FooterMenu = () => (
  <footer data-testid="footer">
    <section className="buttons-footer">
      <Link to="/bebidas">
        <input
          data-testid="drinks-bottom-btn"
          type="image"
          alt="Botão Dink"
          src={ drinkIcon }
        />
      </Link>
      <Link to="/explorar">
        <input
          data-testid="explore-bottom-btn"
          type="image"
          alt="Botão explorar"
          src={ exploreIcon }
        />
      </Link>
      <Link to="/comidas">
        <input
          type="image"
          alt="Botão refeição"
          data-testid="food-bottom-btn"
          src={ mealIcon }
        />
      </Link>
    </section>
  </footer>
);

export default FooterMenu;
