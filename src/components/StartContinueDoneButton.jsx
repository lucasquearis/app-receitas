import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressValidation from '../services/recipeProgress';
import SetInProgress from '../services/InProgressDoneHandle';

const ContRec = (id, type, ingredients) => {
  const obj = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="button-details"
      onClick={ () => SetInProgress(id, type, ingredients) }
    >
      Continuar Receita
    </button>
  );
  return obj;
};
const StartRec = (id, type, ingredients) => {
  const obj = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="button-details"
      onClick={ () => SetInProgress(id, type, ingredients) }
    >
      Iniciar Receita
    </button>
  );
  return obj;
};

const DoneRec = (id, type, ingredients) => {
  const obj = (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      className="button-details"
      onClick={ () => SetInProgress(id, type, ingredients) }
    >
      Finalizar Receita
    </button>
  );
  return obj;
};

const ItsInProgress = () => {
  const indexmatch = -1;
  return window.location.pathname.indexOf('in-progress') !== indexmatch;
};
function StartContinueDoneButton(props) {
  const { id, type, ingredients } = props;
  const [inProgress, setProgressbutton] = useState(false);

  useEffect(() => {
    setProgressbutton(ItsInProgress());
  }, []);

  if (inProgress) {
    return (
      <>
        {DoneRec()}
      </>
    );
  }

  return (
    <div>
      {ProgressValidation(id, type)
        ? ContRec(id, type, ingredients)
        : StartRec(id, type, ingredients) }
    </div>
  );
}

const { string, shape } = PropTypes;
StartContinueDoneButton.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  ingredients: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,
};

export default StartContinueDoneButton;
