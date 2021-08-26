import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Button, Image } from 'react-bootstrap';
import * as fetchAPI from '../service/fetchAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DrinkDetails(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState([]);
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = data;

  useEffect(() => {
    const { history: { location: { pathname } } } = props;
    const id = pathname.split('/')[2];
    fetchAPI.fetchDrinkById(id).then(({ drinks }) => setData(drinks[0]));
    fetchAPI.fetchDrinkSuggestions().then(({ drinks }) => setTip(drinks));
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

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <Image fluid data-testid="recipe-photo" src={ strDrinkThumb } alt="recipe" />
      <div className="favorite-container">
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <button data-testid="share-btn" type="button">
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="share icon" />
        </button>
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
            <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
              <Image fluid src={ recipe.strDrinkThumb } />
              <h4>{ recipe.strDrink }</h4>
            </Carousel.Item>))
        }
      </Carousel>
      <Button
        style={ { position: 'fixed', bottom: '0' } }
        type="button"
        data-testid="start-recipe-btn"
        className="btn-success"
      >
        Iniciar Receita
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
