import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas" data-testid="drinks-bottom-btn">
      <img src="../images/drinkIcon.svg" alt="icon" />
    </Link>
    <Link to="/explorar" data-testid="explore-bottom-btn">
      <button type="button">
        Explorar
      </button>
    </Link>
    <Link to="/comidas" data-testid="food-bottom-btn">
      <button type="button">
        Comidas
      </button>
    </Link>
  </footer>
);

export default Footer;
