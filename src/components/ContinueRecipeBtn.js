import React from 'react';
import PropTypes from 'prop-types';

const ContinueRecipeBtn = ({ pathname }) => {
  const handleClick = () => {
    window.location.href = `${pathname}/in-progress`;
  };

  return (
    <button
      className="start-recipe-btn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      Continuar Receita
    </button>
  );
};

ContinueRecipeBtn.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default ContinueRecipeBtn;
