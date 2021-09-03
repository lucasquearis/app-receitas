import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MainContext from '../context/MainContext';

function CardIngredientFood(props) {
  const { food, i } = props;
  const [redirect, setRedirect] = useState('');
  const { setIngredient } = useContext(MainContext);
  const ingrediente = () => {
    setIngredient(food.strIngredient);
    setRedirect('Comidas');
  };

  if (redirect === 'Comidas') return <Redirect to="/comidas" />;

  return (
    <div>
      <button
        type="button"
        onClick={ ingrediente }
        data-testid={ `${i}-ingredient-card` }
      >
        <h4 data-testid={ `${i}-card-name` }>{food.strIngredient}</h4>
        <img
          data-testid={ `${i}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` }
          alt={ food.strIngredient }
        />
      </button>
    </div>
  );
}
CardIngredientFood.propTypes = {
  food: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardIngredientFood;
