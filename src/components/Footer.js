import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src="../images/drinkIcon.svg" alt="Bebidas" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src="../images/exploreIcon.svg" alt="Explorar" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src="./images/mealIcon.svg" alt="Comidas" />
      </Link>
    </footer>
  );
}

export default Footer;
