import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MainContext from '../context/MainContext';

function CardIngredientDrink(props) {
  const { drink, i } = props;
  const [redirect, setRedirect] = useState('');
  const { setIngredient } = useContext(MainContext);
  const ingrediente = () => {
    setIngredient(drink.strIngredient1);
    setRedirect('Bebidas');
  };

  if (redirect === 'Bebidas') return <Redirect to="/bebidas" />;

  return (
    <div>
      <button
        type="button"
        onClick={ ingrediente }
        data-testid={ `${i}-ingredient-card` }
      >
        <h4 data-testid={ `${i}-card-name` }>{drink.strIngredient1}</h4>
        <img
          data-testid={ `${i}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
          alt={ drink.strIngredient1 }
        />
      </button>
    </div>
  );
}

CardIngredientDrink.propTypes = {
  drink: PropTypes.arrayOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardIngredientDrink;
