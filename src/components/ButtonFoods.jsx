import React from 'react';
import { useHistory } from 'react-router';

function ButtonFoods() {
  const id = 52771;
  const setHistory = useHistory();
  const handleClick = () => {
    setHistory.push(`/comidas/${id}/in-progress`);
  };

  return (
    <div className="div-button-details">
      <button
        className="button-details"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        iniciar receita
      </button>
    </div>
  );
}

export default ButtonFoods;
