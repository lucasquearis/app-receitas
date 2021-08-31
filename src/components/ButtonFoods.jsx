import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

function ButtonFoods() {
  const ido = 52771;
  const [none, setNone] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const setHistory = useHistory();
  const handleClick = () => {
    setHistory.push(`/comidas/${ido}/in-progress`);
  };

  useEffect(() => {
    setNone(localStorage.getItem('doneRecipes')
      && (JSON.parse(localStorage.getItem('doneRecipes')).some(
        (item) => item.id === ido,
      )));
    setInProgress(localStorage.getItem('inProgressRecipes')
      && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).some((itemId) => itemId === ido)));
  }, []);

  return (
    <div className="div-button-details">
      <button
        hidden={ none }
        className="button-details"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </div>
  );
}

export default ButtonFoods;
