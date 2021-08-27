import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../cssPages/ButtonDetailMain.css';

function ButtonDetailMain(renderData) {
  const { id: idRecipe, pathname } = renderData;
  const [redirect, setRedirect] = useState(null);

  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const notDone = ((doneRecipes.filter(({ id }) => id === idRecipe).length) !== 1);
  const inProgress = localStorage.getItem('inProgressRecipes')
    ? localStorage.getItem('inProgressRecipes') : '';
  const recipeinProgress = inProgress.includes(idRecipe);

  const mainBtnClick = () => setRedirect(`${pathname}/in-progress`);

  const detailsBtn = () => (
    <button
      className="mainBtn"
      data-testid="start-recipe-btn"
      type="button"
      onClick={ mainBtnClick }
    >
      {recipeinProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );

  if (redirect) return <Redirect to={ redirect } />;

  return (notDone && detailsBtn());
}

export default ButtonDetailMain;
