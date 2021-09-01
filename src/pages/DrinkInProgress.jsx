import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import '../styles/InProgress.css';
import { updateInProgressStorage,
  initialInProgressStorage } from '../services/inProgressStorage';

export default function DrinkInProgress(props) {
  const [drink, setDrink] = useState({});
  const [loading, setLoading] = useState(true);
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchDetails = async () => {
      const { drinks } = await fetchAPI(END_POINT);
      setDrink(drinks[0]);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    if (!storage) {
      initialInProgressStorage();
    } else if (storage.drinks[id]) {
      setCheckedSteps(storage.drinks[id]);
    }
  }, []);

  useEffect(() => {
    updateInProgressStorage('drinks', id, checkedSteps);
  }, [checkedSteps]);

  function share() {
    console.log('compartilhando');
  }

  function favoriteIt() {
    console.log('favoritando');
  }

  function finish() {
    setRedirect(true);
  }

  function mNI(type) {
    return Object.keys(drink).filter((item) => item.includes(type)
      && drink[item] !== ' ' && drink[item] !== '' && drink[item] !== null);
  }

  useEffect(() => {
    const disable = mNI('strIngredient').length === checkedSteps.length;
    setDisabled(!disable);
  }, [checkedSteps, drink]);

  function updateCheckedSteps({ target: { value } }) {
    if (!checkedSteps.some((ing) => ing === value)) {
      setCheckedSteps([...checkedSteps, value]);
    } else {
      setCheckedSteps(checkedSteps.filter((ing) => ing !== value));
    }
  }

  if (loading) return <span>Loading...</span>;
  if (redirect) return <Redirect to="/receitas-feitas" />;
  return (
    <div className="in-progress-div">
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
            <input
              type="checkbox"
              checked={ checkedSteps
                .some((ing) => ing === drink[mNI('strIngredient')[index]]) }
              name={ index }
              value={ drink[mNI('strIngredient')[index]] }
              onChange={ updateCheckedSteps }
            />
            { `${drink[objectKey]} of ${drink[mNI('strIngredient')[index]]} `}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ finish }
        disabled={ disabled }
      >
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
