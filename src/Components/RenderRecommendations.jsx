import React from 'react';
import { string, bool, arrayOf } from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function RenderRecommendations({ recommendation, key }) {
  return (
    <Carousel>
      {recommendation && recommendation.map((item, index) => (
        <div
          key={ key ? item.idMeal : item.idDrink }
          data-testid={ `${index}-recomendation-card` }
        >
          <Carousel.Item interval={ 1000 }>
            <Carousel.Caption>
              <img
                src={ key ? item.strMealThumb : item.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt={ key ? item.strMeal : item.strDrink }
              />
              <div>
                <span data-testid={ `${index}-card-name` }>
                  { key ? item.strMeal : item.strDrink }
                </span>
                <span>
                  { key ? item.strCategory : item.strAlcoholic }
                </span>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </div>
      ))}
    </Carousel>
  );
}

RenderRecommendations.defaultProps = {
  key: null,
};

RenderRecommendations.propTypes = {
  key: bool,
  recommendation: arrayOf(string).isRequired,
};

export default RenderRecommendations;
