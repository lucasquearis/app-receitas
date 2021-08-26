import React from 'react';
import PropTypes from 'prop-types';

const InstructionsDetails = ({ instruction }) => (
  <div className="component-details">
    <h1>Instructions</h1>
    <p data-testid="instructions">{instruction}</p>
  </div>
);

InstructionsDetails.propTypes = {
  instruction: PropTypes.string.isRequired,
};

export default InstructionsDetails;
