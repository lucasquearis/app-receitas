import React from 'react';
import '../CSS/Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <img
          name="drinks-botton"
          className="drinks-botton"
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
          alt="drinks-botton"
        />
      </Link>
      <Link to="/explorar">
        <img
          name="explore-bottom"
          className="explore-botton"
          data-testid="explore-bottom-btn"
          src="../images/exploreIcon.svg"
          alt="explore-bottom"
        />
      </Link>
      <Link to="/comidas">
        <img
          name="food-bottom"
          className="food-botton"
          data-testid="food-bottom-btn"
          src="../images/mealIcon.svg"
          alt="food-bottom"
        />
      </Link>
    </footer>
  );
}
