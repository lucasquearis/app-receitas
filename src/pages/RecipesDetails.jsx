import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Button, Image } from 'react-bootstrap';
import * as fetchAPI from '../service/fetchAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipesDetails(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState([]);
  const [URLId, setURLId] = useState('');
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data;

  useEffect(() => {
    const { history: { location: { pathname } } } = props;
    const id = pathname.split('/')[2];
    fetchAPI.fetchRecipeById(id).then(({ meals }) => setData(meals[0]));
  }, []);

  useEffect(() => {
    if (strYoutube) { setURLId(strYoutube.split('=')[1]); }
    fetchAPI.fetchRecipeByCategory(strCategory).then(({ meals }) => setTip(meals));
    setLoading(false);
  }, [data]);

  const getIngredients = () => {
    const negEight = -8;
    const negNine = -9;
    const keys = Object.keys(data);
    return keys.map((key, index) => {
      if (key.includes('strIngredient')) {
        const measure = `strMeasure${index + negEight}`;
        return (
          (data[key] !== '' && data[key] !== null)
            && (
              <p
                key={ index + negNine }
                data-testid={ `${index + negNine}-ingredient-name-and-measure` }
              >
                { `- ${data[key]} - ${data[measure]}` }
              </p>
            )
        );
      }
      return null;
    });
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <Image fluid data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <div className="favorite-container">
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <button data-testid="share-btn" type="button">
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="share icon" />
        </button>
        <h4 data-testid="recipe-category">{ strCategory }</h4>
      </div>
      <h4>Ingredientes</h4>
      <div className="ingredients-container">
        {getIngredients()}
      </div>
      <h4>Instruções</h4>
      <p data-testid="instructions">{ strInstructions }</p>
      <h4>Video</h4>
      <iframe
        data-testid="video"
        width="100%"
        title="recipe"
        src={ `https://www.youtube.com/embed/${URLId}` }
      />
      <Carousel>
        {
          tip && tip.map((recipe, index) => (
            <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
              <Image fluid src={ recipe.strMealThumb } />
              <h4>{ recipe.strMeal }</h4>
            </Carousel.Item>))
        }
      </Carousel>
      <Button type="button" data-testid="start-recipe-btn" className="btn-success">
        Iniciar Receita
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
