import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Carousel, Button, Image } from 'react-bootstrap';
import * as fetchAPI from '../service/fetchAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const maxSuggestions = 6;

const heartIcon = () => {
  const isFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return isFavorite ? blackHeartIcon : whiteHeartIcon;
};

function DrinkDetails(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [copied, setCopied] = useState(false);
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = data;

  const { history: { location: { pathname } } } = props;
  useEffect(() => {
    const id = pathname.split('/')[2];
    fetchAPI.fetchDrinkById(id).then(({ drinks }) => setData(drinks[0]));
    fetchAPI.fetchRecipeSuggestions().then(({ meals }) => setTip(meals));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const getIngredients = () => {
    const keys = Object.keys(data).filter((key) => key.includes('strIngredient'));
    return keys.map((key, index) => {
      const measure = `strMeasure${index + 1}`;
      return (
        (data[key] !== '' && data[key] !== null)
          && (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `- ${data[key]} - ${data[measure]}` }
            </p>
          )
      );
    });
  };

  const buttonName = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const condition = inProgress ? inProgress.cocktails[data.idDrink] : undefined;
    if (condition === undefined) return 'Iniciar Receita';
    return 'Continuar Receita';
  };

  const handleClick = () => setRedirect(true);

  const shareHandleClick = () => {
    setCopied(true);
    copy(`http://localhost:3000${pathname}`);
  };

  if (redirect) return <Redirect to={ `/bebidas/${data.idDrink}/in-progress` } />;

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <Image fluid data-testid="recipe-photo" src={ strDrinkThumb } alt="recipe" />
      <div className="favorite-container">
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => shareHandleClick() }
        >
          <img src={ shareIcon } alt="share icon" />
          {copied && <span>Link copiado!</span>}
        </button>
        <Image data-testid="favorite-btn" alt="heart" src={ heartIcon() } />
        <h4 data-testid="recipe-category">{ strAlcoholic }</h4>
      </div>
      <h4>Ingredientes</h4>
      <div className="ingredients-container">
        {getIngredients()}
      </div>
      <h4>Instruções</h4>
      <p data-testid="instructions">{ strInstructions }</p>
      <Carousel>
        {
          tip && tip.map((recipe, index) => (
            index < maxSuggestions
            && (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <Image fluid src={ recipe.strMealThumb } />
                <h4 data-testid={ `${index}-recomendation-title` }>
                  { recipe.strMeal }
                </h4>
              </Carousel.Item>)))
        }
      </Carousel>
      <Button
        style={ { position: 'fixed', bottom: '0' } }
        type="button"
        data-testid="start-recipe-btn"
        className="btn-success"
        onClick={ handleClick }
      >
        {buttonName()}
      </Button>
    </div>
  );
}

DrinkDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinkDetails;
