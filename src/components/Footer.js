import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">drinkIcon.svg</Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">exploreIcon.svg</Link>
      <Link to="/comidas" data-testid="food-bottom-btn">mealIcon.svg</Link>
    </footer>
  );
}

export default Footer;
