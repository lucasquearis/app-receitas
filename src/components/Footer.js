import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

// O menu inferior deve ter possuir o atributo data-testid="footer";
// drinks deve possuir o atributo data-testid="drinks-bottom-btn";
// explorar deve possuir o atributo data-testid="explore-bottom-btn";
// comidas deve possuir o atributo data-testid="food-bottom-btn".

const Footer = () => (
  <footer data-testid="footer" className="fixedbottom">
    <Link
      to="/bebidas"
    >
      <img
        src={ drinkIcon }
        alt="drinks"
        data-testid="drinks-bottom-btn"
      />
    </Link>
    <Link
      to="/explorar"
    >
      <img
        alt="explore"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
      />
    </Link>
    <Link
      to="/comidas"
    >
      <img
        src={ mealIcon }
        alt="meal"
        data-testid="food-bottom-btn"
      />
    </Link>
  </footer>
);
export default Footer;
