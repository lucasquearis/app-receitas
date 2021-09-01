import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function FinishRecipeButton({ setRedirectToDone }) {
  const { allChecked } = useContext(AppContext);

  const handleClick = () => {
    setRedirectToDone(true);
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ !allChecked }
      onClick={ handleClick }
    >
      Finalizar Receita
    </button>
  );
}

FinishRecipeButton.propTypes = {
  setRedirectToDone: PropTypes.func.isRequired,
};
