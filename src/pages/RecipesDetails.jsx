import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Carousel, Button, Image } from 'react-bootstrap';
import * as fetchAPI from '../service/fetchAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './details.css';

const maxSuggestions = 6;

function RecipesDetails(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState([]);
  const [URLId, setURLId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [copied, setCopied] = useState(false);
  const [icon, setIcon] = useState(whiteHeartIcon);
  const {
    idMeal,
    strArea,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = data;

  const { history: { location: { pathname } } } = props;
  useEffect(() => {
    const id = pathname.split('/')[2];
    fetchAPI.fetchRecipeById(id).then(({ meals }) => setData(meals[0]));
    fetchAPI.fetchDrinkSuggestions().then(({ drinks }) => setTip(drinks));

    const heartIcon = () => {
      const isFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      return isFavorite ? setIcon(blackHeartIcon) : setIcon(whiteHeartIcon);
    };

    heartIcon();
  }, []);

  useEffect(() => {
    if (strYoutube) { setURLId(strYoutube.split('=')[1]); }
    setLoading(false);
  }, [data]);

  const favoriteRecipes = [{
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  }];

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
    return inProgress ? 'Continuar Receita' : 'Iniciar Receita';
  };

  const handleClick = () => setRedirect(true);

  const shareHandleClick = () => {
    setCopied(true);
    copy(`http://localhost:3000${pathname}`);
  };

  const setFavorite = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  function toggleHeartIcon() {
    const bool = icon === whiteHeartIcon
      ? setIcon(blackHeartIcon) : setIcon(whiteHeartIcon);
    setFavorite();
    return bool;
  }

  if (redirect) return <Redirect to={ `/comidas/${data.idMeal}/in-progress` } />;
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="main-containe">
      <Image fluid data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <div className="favorite-container">
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <div className="icons">
          <Image
            data-testid="share-btn"
            src={ shareIcon }
            alt="share icon"
            onClick={ () => shareHandleClick() }
          />
          {copied && <span>Link copiado!</span>}
          <Image
            data-testid="favorite-btn"
            alt="heart"
            src={ icon }
            onClick={ () => toggleHeartIcon() }
          />
        </div>
      </div>
      <h5 data-testid="recipe-category">{ strCategory }</h5>
      <h4>Ingredientes</h4>
      <div className="ingredients-container">
        {getIngredients()}
      </div>
      <h4>Instruções</h4>
      <p data-testid="instructions">{ strInstructions }</p>
      <h4>Video</h4>
      <iframe
        data-testid="video"
        height="215px"
        width="100%"
        title="recipe"
        src={ `https://www.youtube.com/embed/${URLId}` }
      />
      <h4>Recomendadas</h4>
      <Carousel className="carousel" indicators={ false }>
        {
          tip && tip.map((recipe, index) => (
            index < maxSuggestions
            && (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <Image fluid src={ recipe.strDrinkThumb } />
                <h4 data-testid={ `${index}-recomendation-title` }>
                  { recipe.strDrink }
                </h4>
              </Carousel.Item>)))
        }
      </Carousel>
      <Button
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

RecipesDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipesDetails;
