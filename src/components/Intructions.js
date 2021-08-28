import React from 'react';
import PropTypes from 'prop-types';

export default function Intructions(props) {
  const { recipe } = props;
  const key = 'strInstructions';
  if (!recipe) return '';
  return (
    <div className="instructions-container">
      <h3 className="title-instructions">Instruções</h3>
      <p
        data-testid="instructions"
        className="instructions"
      >
        { recipe[key] }
      </p>
    </div>
  );
}

Intructions.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};
