import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import '../styles/InProgress.css';

export default function DrinkInProgress(props) {
  const [drink, setDrink] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { match: { params: { id } } } = props;
    const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchDetails = async () => {
      const { drinks } = await fetchAPI(END_POINT);
      setDrink(drinks[0]);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  function share() {
    console.log('compartilhando');
  }

  function favoriteIt() {
    console.log('favoritando');
  }

  function finish() {
    console.log('finalizando');
  }

  function mNI(type) {
    return Object.keys(drink).filter((item) => item.includes(type)
      && drink[item] !== ' ' && drink[item] !== '' && drink[item] !== null);
  }

  if (loading) return <span>Loading...</span>;

  return (
    <div className="in-progress-div">
      { console.log(mNI('strMeasure'), drink)}
      <img
        data-testid="recipe-photo"
        alt="imagem da receita"
        src={ drink.strDrinkThumb }
        className="recipe-photo"
      />
      <div data-testid="recipe-title">{ drink.strDrink }</div>
      <button type="button" data-testid="share-btn" onClick={ share }>
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn" onClick={ favoriteIt }>
        Favoritar
      </button>
      <div data-testid="recipe-category">{ drink.strCategory }</div>
      <ul className="lista">
        { mNI('strMeasure').map((objectKey, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" />
            { `${drink[objectKey]} of ${drink[mNI('strIngredient')[index]]} `}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn" onClick={ finish }>
        Finalizar
      </button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
