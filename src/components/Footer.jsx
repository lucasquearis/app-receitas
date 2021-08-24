import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button type="button" data-testid="drinks-bottom-btn">DRINK</button>
      </Link>
      <Link to="/explorar">
        <button type="button" data-testid="explore-bottom-btn"> EXPLORAR </button>
      </Link>
      <Link to="/comidas">
        <button type="button" data-testid="food-bottom-btn"> FOOD </button>
      </Link>
    </footer>
  );
}
