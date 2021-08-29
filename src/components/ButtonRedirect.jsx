import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../cssPages/ButtonRedirect.css';

function ButtonRedirect(data) {
  const { renderData:
    { id: idRecipe, pathname, renderType, completed, localStrObject } } = data;
  const [redirect, setRedirect] = useState(null);

  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const notDone = ((doneRecipes.filter(({ id }) => id === idRecipe).length) !== 1);
  const inProgress = localStorage.getItem('inProgressRecipes')
    ? localStorage.getItem('inProgressRecipes') : '';
  const recipeinProgress = inProgress.includes(idRecipe);

  const completeRecipe = () => {
    const newDoneRecipe = { ...localStrObject };
    newDoneRecipe.doneDate = (new Date()).toLocaleDateString();
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newDoneRecipe]));
  };

  const redirectClick = (path) => {
    if (renderType) completeRecipe();
    setRedirect(path);
  };

  const redirectBtn = ([testId, destiny, text, disabled]) => (
    <button
      className="redirectBtn"
      data-testid={ testId }
      disabled={ disabled }
      type="button"
      onClick={ () => redirectClick(destiny) }
    >
      {text}
    </button>
  );

  if (redirect) return <Redirect to={ redirect } />;

  return (
    renderType
      ? redirectBtn(['finish-recipe-btn', '/receitas-feitas', 'Finalizar receita',
        !completed])
      : notDone && redirectBtn(['start-recipe-btn',
        (`${pathname}/in-progress`).replace('//', '/'),
        (recipeinProgress ? 'Continuar Receita' : 'Iniciar Receita')])
  );
}

export default ButtonRedirect;
