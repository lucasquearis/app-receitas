import React from 'react';
import PropTypes from 'prop-types';
import ProgressValidation from '../services/recipeProgress';

function StartContinueDoneButton(props) {
  const { id, type } = props;

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="button-details"
    >
      {ProgressValidation(id, type) ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
}

const { string } = PropTypes;
StartContinueDoneButton.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
};

export default StartContinueDoneButton;
