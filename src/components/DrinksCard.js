import React from 'react';
// import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
// import DrinksContext from '../context/DrinksContext';
// import fetchDrinkDetailsApi from '../services/fetchDrinkDetailsApi';

const DrinksCard = ({ drink, index }) => {
  // const history = useHistory();
  // const { setDrinkDetails } = useContext(DrinksContext);

  // const handleClick = () => {
  //   const { idDrink } = drink;
  //   // fetchDrinkDetailsApi(idDrink).then((data) => setDrinkDetails(data.drinks));
  //   history.push(`/bebidas/${idDrink}`);
  // };

  return (
    <div
      // role="tab"
      // tabIndex={ 0 }
      // onClick={ handleClick }
      // onKeyDown={ handleClick }
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
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinksCard;
