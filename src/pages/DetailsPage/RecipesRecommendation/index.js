import React from 'react';
import PropTypes from 'prop-types';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './index.css';

import { useDataContext } from '../../../context/DataProvider';

export default function RecipesRecommendation({ type }) {
  // objeto responsável por definir quando o carousel deve comecar a se comportar de maneira diferente,
  // e a quantiade de itens que o carousel deve mostrar por vez;
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const { data, loading } = useDataContext();

  // pega os dados da API inversa de acordo com o tipo recebido
  const reccomendedRecipes = type === 'food' ? 'drinks' : 'food';

  const maxLength = 6;

  return (
  // Component que faz a montagem do carousel, para mais detalhes: https://www.npmjs.com/package/react-multi-carousel;
    <Carousel responsive={ responsive }>
      {!loading && data[reccomendedRecipes].slice(0, maxLength)
        .map((cardRecommendation, index) => (
          <div
            className="cardRecommendation"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ cardRecommendation.strDrinkThumb || cardRecommendation.strMealThumb }
              alt="First slide"
            />
            <p data-testid={ `${index}-recomendation-title` }>
              { cardRecommendation.strDrink || cardRecommendation.strMeal }
            </p>
            <p>
              { cardRecommendation.strAlcoholic || cardRecommendation.strCategory }
            </p>
          </div>
        ))}
    </Carousel>
  );
}

RecipesRecommendation.propTypes = {
  type: PropTypes.string.isRequired,
};
