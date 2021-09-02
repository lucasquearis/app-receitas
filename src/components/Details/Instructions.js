import React from 'react';
import { string } from 'prop-types';
import './Instructions.css';

export default function Instructions(props) {
  const { instructions } = props;
  return (
    <div>
      <h2>Instructions</h2>
      <p data-testid="instructions">{ instructions }</p>
    </div>
  );
}

Instructions.propTypes = {
  instructions: string.isRequired,
};
