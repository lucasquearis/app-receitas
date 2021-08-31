import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

function ButtonDrinks() {
  const ido = 178319;
  // const { id, type} = props;
  // const type = 'cocktail';
  const [none, setNone] = useState(true);
  // const [inProgress, setInProgress] = useState(false);
  const setHistory = useHistory();
  const handleClick = () => {
    setHistory.push(`/bebidas/${ido}/in-progress`);
  };

  useEffect(() => {
    const recipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipe) {
      const findRecipe = recipe.find((item) => item.id === ido);
      if (findRecipe) setNone(false);
    }
    // setNone(localStorage.getItem('doneRecipes')
    //   && (JSON.parse(localStorage.getItem('doneRecipes')).some(
    //     (item) => item.id === ido,
    //   )));
    // setInProgress(localStorage.getItem('inProgressRecipes')
    //   && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes'))[
    //     type]).some((recipeId) => recipeId === ido));
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
        Iniciar Receita
        {/* {inProgress ? 'Continuar Receita' : 'Iniciar Receita'} */}
      </button>
    </div>
  );
}

export default ButtonDrinks;
