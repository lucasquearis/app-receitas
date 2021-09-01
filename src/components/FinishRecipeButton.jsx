import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FinishRecipeButton(props) {
  const { id, type, enType } = props;
  const newEnType = enType === 'meals' ? enType : 'cocktails';
  const [done, setDone] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  return (
    <Link to={ `/${type}/${id}/in-progress` }>
      <button
        hidden={ done }
        className="start-recipe-button"
        type="button"
        data-testid="finish-recipe-btn"
      >
        {inProgress ? 'Continuar Receita' : 'Finalizar Receita'}
      </button>
    </Link>
  );
}

FinishRecipeButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  enType: PropTypes.string,
}.isRequired;

export default FinishRecipeButton;
