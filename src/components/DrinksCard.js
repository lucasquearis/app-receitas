import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import DrinksContext from '../context/DrinksContext';

const DrinksCard = ({ drink, index }) => {
  const history = useHistory();
  const { setDrinkDetailsId } = useContext(DrinksContext);

  const handleClick = ({ idDrink }) => {
    setDrinkDetailsId(idDrink);
    history.push(`/bebidas/${idDrink}`);
  };

  return (
    <div
      role="tab"
      tabIndex={ 0 }
      onClick={ () => handleClick(drink) }
      onKeyDown={ () => handleClick(drink) }
      className="drinks-card"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ drink.strDrinkThumb }
        alt="drink"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
    </div>
  );
};

DrinksCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinksCard;
