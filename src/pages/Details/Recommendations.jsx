import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import { fetchRecommendations } from '../../services/API';
import './Recommendations.css';

function Recommendations({ endpoint }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const request = await fetchRecommendations(endpoint);
      const recipes = request[Object.keys(request)[0]];
      const recommendationsList = [
        recipes[0],
        recipes[1],
        recipes[2],
        recipes[3],
        recipes[4],
        recipes[5],
      ];
      setRecommendations(recommendationsList);
    };
    getRecommendations();
  }, [endpoint]);

  const getCockTailsRecommendations = () => (
    <div>
      <h3>Recommendations</h3>
      <div className="cards-container">
        {recommendations.map((recommendation, index) => (
          <Card
            data-testid={ `${index}-recomendation-card` }
            style={ { minWidth: '50%' } }
            key={ index }
          >
            <Card.Img variant="top" src={ recommendation.strDrinkThumb } />
            <Card.Body>
              <Card.Text>{recommendation.strAlcoholic}</Card.Text>
              <Card.Title
                data-testid={ `${index}-recomendation-title` }
              >
                {recommendation.strDrink}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );

  const getMealsRecommendations = () => (
    <div>
      <h3>Recommendations</h3>
      <div className="cards-container">
        {recommendations.map((recommendation, index) => (
          <Card
            data-testid={ `${index}-recomendation-card` }
            style={ { minWidth: '50%' } }
            key={ index }
          >
            <Card.Img variant="top" src={ recommendation.strMealThumb } />
            <Card.Body>
              <Card.Text>{recommendation.strCategory}</Card.Text>
              <Card.Title
                data-testid={ `${index}-recomendation-title` }
              >
                {recommendation.strMeal}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    endpoint === 'themealdb'
      ? getMealsRecommendations()
      : getCockTailsRecommendations()
  );
}

Recommendations.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default Recommendations;
