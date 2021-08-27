import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const CardsList = ({ array }) => {
  const [redirect, setRedirect] = useState(false);
  const [itemId, setItemId] = useState();
  const [url, setUrl] = useState('');
  let type;
  if (array !== undefined) {
    if (array[0].idDrink === undefined) type = 'Meal';
    else type = 'Drink';

    let newArray;
    const maxCards = 12;
    if (array.length > maxCards) {
      newArray = array.slice(0, maxCards);
    } else {
      newArray = array;
    }

    const handleClick = (id, foodDrink) => {
      setRedirect(true);
      setItemId(id);
      if (foodDrink === 'idDrink') {
        setUrl('bebidas');
      } else {
        setUrl('comidas');
      }
    };

    if (redirect) {
      return <Redirect to={ `/${url}/${itemId}` } />;
    }

    return (
      <div>
        { newArray.map((obj, index) => {
          const objKeys = Object.keys(obj);
          console.log(objKeys[0]);
          return (
            <div
              role="button"
              tabIndex={ 0 }
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleClick(obj[objKeys[0]], objKeys[0]) }
              onKeyDown={ () => handleClick() }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ obj[`str${type}Thumb`] }
                alt={ obj[`str${type}`] }
              />
              <h3 data-testid={ `${index}-card-name` }>{ obj[`str${type}`] }</h3>
            </div>
          );
        }) }
      </div>
    );
  }
};

CardsList.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default CardsList;
