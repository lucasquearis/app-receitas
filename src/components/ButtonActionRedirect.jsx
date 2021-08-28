import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../cssPages/ButtonActionRedirect.css';

function ButtonActionRedirect(data) {
  const { renderData: { id: idRecipe, pathname, renderType, completed } } = data;
  const [redirect, setRedirect] = useState(null);

  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const notDone = ((doneRecipes.filter(({ id }) => id === idRecipe).length) !== 1);
  const inProgress = localStorage.getItem('inProgressRecipes')
    ? localStorage.getItem('inProgressRecipes') : '';
  const recipeinProgress = inProgress.includes(idRecipe);

  const redirectClick = (path) => setRedirect(path);

  const detailsBtn = () => (
    <button
      className="detailBtn"
      data-testid="start-recipe-btn"
      type="button"
      onClick={ () => redirectClick(`${pathname}/in-progress`) }
    >
      {recipeinProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );

  const progressBtn = () => (
    <button
      className="progressBtn"
      data-testid="finish-recipe-btn"
      disabled={ !completed }
      type="button"
      onClick={ () => redirectClick('/receitas-feitas') }
    >
      Finalizar receita
    </button>
  );

  if (redirect) return <Redirect to={ redirect } />;

  return (
    <>
      { !renderType && notDone && detailsBtn() }
      { renderType && progressBtn() }
    </>
  );
}

export default ButtonActionRedirect;
