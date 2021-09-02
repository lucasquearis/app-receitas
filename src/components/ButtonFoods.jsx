import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

function ButtonFoods() {
  const { pathname } = useLocation();
  const id = pathname.replace(/([^\d])+/gim, '');
  const [none, setNone] = useState(false);
  const [inStorage, setInStorage] = useState(false);
  const setHistory = useHistory();
  const type = 'meals';

  const handleClick = () => {
    setHistory.push(`/comidas/${id}/in-progress`);
  };

  useEffect(() => {
    const recipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipe) {
      const doneRecipe = recipe.find((item) => item.id === id);
      if (doneRecipe) setNone(true);
    }
  }, [id]);

  useEffect(() => {
    setInStorage(localStorage.getItem('inProgressRecipes')
      && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes'))[
        type]).some((meals) => meals === id));
  }, [id]);

  return (
    <div className="div-button-details">
      <button
        hidden={ none }
        className="button-details"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {inStorage ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </div>
  );
}

export default ButtonFoods;
