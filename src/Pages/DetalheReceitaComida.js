import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copyToClipBoard from 'clipboard-copy';
import { buscarComidasID } from '../service/ComidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getFoodIngredients from '../service/getFoodIngredients';

const defaultParams = {
  strMeal: '',
  strMealThumb: '',
  strCategory: '',
  strInstructions: '',
};

export default function DetalheReceitaComida(props) {
  const { match: { params: { id } } } = props;
  const [recipe, setRecipe] = useState([defaultParams]);
  const [copyMessage, setCopyMessage] = useState(false);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [isLoading, changeLoading] = useState(true);

  useEffect(() => {
    buscarComidasID(id)
      .then((result) => setRecipe(result))
      .then(() => getFoodIngredients(recipe[0]))
      .then((ingredients) => setFoodIngredients(ingredients))
      .then(() => changeLoading(false));

    changeLoading(false);
  }, [id, recipe]);

  const setMessageTime = () => {
    const messageTime = 1000;
    setTimeout(() => {
      setCopyMessage(false);
    }, messageTime);
  };

  const onShareClicked = () => {
    copyToClipBoard(window.location.href);
    setCopyMessage(true);
    setMessageTime();
  };

  const renderRecipe = () => {
    const { strMeal, strMealThumb, strCategory, strInstructions } = recipe[0];
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <section>
          <div>
            <h4 data-testid="recipe-title">
              { strMeal }
            </h4>
            <button
              type="button"
              className="share-food-btn-icon"
              onClick={ onShareClicked }
            >
              <img
                data-testid="share-btn"
                className="share-icon"
                src={ shareIcon }
                alt="icone de compartilhar"
              />
            </button>
            <button
              type="button"
              className="favorite-btn-icon"
            >
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="icone de favoritar"
              />
            </button>
          </div>
          <p data-testid="recipe-category">{ strCategory }</p>
        </section>
        <section className="ingredients-section">
          <h5>Ingredients</h5>
          <ul>
            {
              foodIngredients.map((ingredient, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ `${index}` }
                >
                  { ingredient }
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{strInstructions}</p>
        </section>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </>
    );
  };

  return (
    <>
      { isLoading ? <p>Loading...</p> : renderRecipe() }
      { copyMessage
        ? <p className="copy-food-link-message">Link copiado!</p>
        : <p className="copy-food-link-message" /> }
    </>
  );
}

DetalheReceitaComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
