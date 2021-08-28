import React from 'react';
// import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { useDataContext } from '../../../context/DataProvider';

export default function RecipesRecommendation({ type }) {
  const { data, loading } = useDataContext();

  const maxLength = 6;

  return (
    <Carousel variant="dark" className="w-50">
      {!loading && data[type].slice(0, maxLength).map((cardRecommendation, index) => (
        <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
          <img
            className="d-block w-100"
            src={ cardRecommendation.strDrinkThumb || cardRecommendation.strMealThumb }
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

RecipesRecommendation.propTypes = {}.isRequired;
