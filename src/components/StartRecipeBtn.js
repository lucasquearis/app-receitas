import React from 'react';
import PropTypes from 'prop-types';

const StartRecipeBtn = ({ pathname }) => {
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
      Iniciar Receita
    </button>
  );
};

StartRecipeBtn.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default StartRecipeBtn;
