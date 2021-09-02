import React from 'react';
import PropTypes from 'prop-types';

export default function Instructions({ instructions }) {
  return (
    <div className="instructions">
      <h2>Instructions</h2>
      <section data-testid="instructions">
        <p data-testid="instructions">{instructions}</p>
      </section>
    </div>
  );
}

Instructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};
