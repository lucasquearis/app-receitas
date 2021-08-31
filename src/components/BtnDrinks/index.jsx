import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../foodDrinks.css';
import { startDrinkRecipe } from '../../services';

function BtnDrinks({ dataId, className, details, id }) {
  const [button, setButton] = useState(false);

  const drinkDetails = details.drinks[0];
  const objKeyDrink = Object.keys(drinkDetails);
  const filterObjDrink = objKeyDrink.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjDrink = filterObjDrink.filter((obj) => drinkDetails[obj] !== null);

  const checkRecipeName = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage) {
      const storageRecipeName = storage.find(({ cocktails }) => (
        String(Object.keys(cocktails)) === drinkDetails.idDrink));
      if (storageRecipeName) {
        setButton(true);
      }
    } else {
      setButton(false);
    }
  }, [drinkDetails.idDrink]);

  useEffect(() => {
    checkRecipeName();
  }, [checkRecipeName]);

  const inProgressRecipes = {
    cocktails: {
      [id]: otherFilterObjDrink.map((drink) => drinkDetails[drink]),
    },
  };

  return (
    <button
      type="button"
      onClick={ () => setButton(startDrinkRecipe(inProgressRecipes)) }
      data-testid={ dataId }
      className={ className }
    >
      { button ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

BtnDrinks.propTypes = {
  onClick: PropTypes.func,
  dataId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  info: PropTypes.string,
}.isRequired;

export default BtnDrinks;
