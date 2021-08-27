import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const Recomendation = ({ list, type }) => {
  if (!list) return <Spinner animation="border" />;
  const maxItens = 6;
  let newArray = [];
  if (list.length > maxItens) {
    newArray = list.slice(0, maxItens);
  } else {
    newArray = list;
  }
  return (
    <div className="component-details">
      <h1>Recomendation</h1>
      <div>
        { newArray.map((obj, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              width="30%"
              data-testid={ `${index}-card-img` }
              src={ obj[`str${type}Thumb`] }
              alt={ obj[`str${type}`] }
            />
            <h3 data-testid={ `${index}-recomendation-title` }>{ obj[`str${type}`] }</h3>
          </div>
        )) }
      </div>
    </div>
  );
};

Recomendation.propTypes = {
  list: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default Recomendation;
