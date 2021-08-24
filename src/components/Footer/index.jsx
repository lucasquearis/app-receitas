import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
      <Nav.Item className="footer-item">
        <Link to="/bebidas">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Ícone bebidas" />
        </Link>
      </Nav.Item>
      <Nav.Item className="footer-item">
        <Link to="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Ícone explorar"
          />
        </Link>
      </Nav.Item>
      <Nav.Item className="footer-item">
        <Link to="/comidas">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="Ícone comidas" />
        </Link>
      </Nav.Item>
    </footer>
  );
}

export default Footer;
