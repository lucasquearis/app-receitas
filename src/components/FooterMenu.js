import React from 'react';
import { useHistory } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/FooterMenu.css';

function FooterMenu() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <label htmlFor="botão de drinks">
        <input
          name="botão de drinks"
          type="image"
          onClick={ () => history.push('/bebidas') }
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="botão de drinks"
        />
      </label>
      <label htmlFor="explorar">
        <input
          name="explorar"
          type="image"
          onClick={ () => history.push('/explorar') }
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explorar"
        />
      </label>
      <label htmlFor="comidas">
        <input
          name="comidas"
          type="image"
          onClick={ () => history.push('/comidas') }
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="comidas"
        />
      </label>
    </footer>
  );
}
export default FooterMenu;
