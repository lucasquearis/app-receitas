import React from 'react';
import { string } from 'prop-types';

export default function Instructions(props) {
  const { instructions } = props;
  return (
    <div className="instructions-container-det">
      <h5>Instructions</h5>
      <p data-testid="instructions">{ instructions }</p>
    </div>
  );
}

Instructions.propTypes = {
  instructions: string.isRequired,
};
