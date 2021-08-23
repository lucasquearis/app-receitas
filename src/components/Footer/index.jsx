import React from 'react';
import Nav from 'react-bootstrap/Nav';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
      <Nav.Item className="footer-item footer-start">
        <Nav.Link href="/bebidas">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Ícone bebidas" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="footer-item footer-middle">
        <Nav.Link href="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Ícone explorar"
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="footer-item footer-end">
        <Nav.Link href="/comidas">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="Ícone comidas" />
        </Nav.Link>
      </Nav.Item>
    </footer>
  );
}

export default Footer;
