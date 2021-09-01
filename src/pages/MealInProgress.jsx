import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import '../styles/InProgress.css';
import { updateInProgressStorage,
  initialInProgressStorage } from '../services/inProgressStorage';

export default function MealInProgress(props) {
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [checkedSteps, setCheckedSteps] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchDetails = async () => {
      const { meals } = await fetchAPI(END_POINT);
      setMeal(meals[0]);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    if (!storage) {
      initialInProgressStorage();
    } else if (storage.meals[id]) {
      setCheckedSteps(storage.meals[id]);
    }
  }, []);

  useEffect(() => {
    updateInProgressStorage('meals', id, checkedSteps);
    if (Object.keys(checkedSteps).length) {
      console.log(Object.values(checkedSteps).every((value) => value === true));
      if (Object.values(checkedSteps).every((value) => value === true)) {
        console.log('setDisabled false');
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
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
    return Object.keys(meal).filter((item) => item.includes(type)
      && meal[item] !== ' ' && meal[item] !== '' && meal[item] !== null);
  }

  function updateCheckedSteps({ target: { name, checked } }) {
    setCheckedSteps({
      ...checkedSteps,
      [name]: checked,
    });
  }

  if (loading) return <span>Loading...</span>;
  if (redirect) return <Redirect to="/receitas-feitas" />;
  return (
    <div className="in-progress-div">
      <img
        data-testid="recipe-photo"
        alt="imagem da receita"
        src={ meal.strMealThumb }
        className="recipe-photo"
      />
      <div data-testid="recipe-title">{ meal.strMeal }</div>
      <button type="button" data-testid="share-btn" onClick={ share }>
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn" onClick={ favoriteIt }>
        Favoritar
      </button>
      <div data-testid="recipe-category">{ meal.strCategory }</div>
      <ul className="lista">
        { mNI('strMeasure').map((objectKey, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              checked={ checkedSteps[index] ? checkedSteps[index] : false }
              name={ index }
              onChange={ updateCheckedSteps }
            />
            { `${meal[objectKey]} of ${meal[mNI('strIngredient')[index]]} `}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ meal.strInstructions }</p>
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

MealInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
