import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

function ButtonFoods() {
  const ide = 52771;
  // const { id, type } = props;
  const type = 'meal';
  const [none, setNone] = useState(true);
  const [inProgres, setInProgres] = useState(false);
  const setHistory = useHistory();
  const handleClick = () => {
    setHistory.push(`/comidas/${ide}/in-progress`);
  };

  useEffect(() => {
    setNone(localStorage.getItem('doneRecipes')
      && (JSON.parse(localStorage.getItem('doneRecipes')).some(
        (item) => item.id === ide,
      )));
    setInProgres(localStorage.getItem('inProgressRecipes')
      && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes'))[
        type]).some((recipeId) => recipeId === ide));
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
        {inProgres ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </div>
  );
}

export default ButtonFoods;
