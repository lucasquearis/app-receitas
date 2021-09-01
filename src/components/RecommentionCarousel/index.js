import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { CarouselWrapper, RecommendationCard } from './style';

function RecommendationCarousel({ suggestionList }) {
  const { pathname } = useLocation();
  const recipeType = (pathname.includes('comidas')) ? 'Drink' : 'Meal';
  return (
    <CarouselWrapper>
      { suggestionList.map((item, index) => {
        const cardsLimit = 6;
        if (index < cardsLimit) {
          return (
            <RecommendationCard
              data-testid={ `${index}-recomendation-card` }
              key={ `${index}-${item[`str${recipeType}`]}-suggestion-card` }
            >
              <img
                className="recomendation-card-img"
                src={ item[`str${recipeType}Thumb`] }
                alt={ `${item[`str${recipeType}`]}-suggestion-card` }
              />
              <h2>{ item.strAlcoholic }</h2>
              <h1
                data-testid={ `${index}-recomendation-title` }
              >
                { item[`str${recipeType}`] }
              </h1>
            </RecommendationCard>
          );
        }
        return null;
      }) }
    </CarouselWrapper>
  );
}

RecommendationCarousel.propTypes = {
  suggestionList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecommendationCarousel;
