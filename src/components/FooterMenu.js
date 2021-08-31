import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function FooterMenu() {
  const history = useHistory();
  const handleClick = (path) => history.push(path);

  return (
    <div className="footer" data-testid="footer">
      <input
        type="image"
        src={ drinkIcon }
        alt="drink-icon"
        data-testid="drinks-bottom-btn"
        onClick={ () => handleClick('/bebidas') }
      />
      <input
        type="image"
        src={ exploreIcon }
        alt="explore-icon"
        data-testid="explore-bottom-btn"
        onClick={ () => handleClick('/explorar') }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="meal-icon"
        data-testid="food-bottom-btn"
        onClick={ () => handleClick('/comidas') }
      />
    </div>
  );
}

FooterMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FooterMenu;
