import React from 'react';
import { arrayOf, string } from 'prop-types';

const Recommendations = ({ recommendations }) => (
  <div>
    <h5 className="recomendations-title">Recommendations</h5>
    <div className="slider">
      { recommendations.map((recommendation, index) => (
        <div
          className="slides"
          key={ `recommendation-${index}` }
          data-testid={ `${index}-recomendation-card` }
        >
          <h4 data-testid={ `${index}-recomendation-title` }>
            { recommendation }
          </h4>
        </div>
      )) }
    </div>
  </div>
);

Recommendations.propTypes = {
  recommendations: arrayOf(string).isRequired,
};

export default Recommendations;
