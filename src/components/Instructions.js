import React from 'react';
import PropTypes from 'prop-types';

export default function Instructions({ instructions }) {

  return (
    <section data-testid="instructions">
        <p data-testid="instructions">{instructions}</p>
    </section>
  );
}

Instructions.propTypes = {
  instructions: PropTypes.string.isRequired,  
};
