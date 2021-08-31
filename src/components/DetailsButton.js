import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

export default function DetailsButton() {
  const [redirectToInProgress, setRedirectToInProgress] = useState(false);
  const [buttonChange, setButtonChange] = useState(true);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const EIGHT = 8;
  const pathnameAPI = pathname.slice(0, EIGHT);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const inProgressByPathname = inProgressRecipes
      ? Object.keys(inProgressRecipes[pathnameAPI === '/comidas' ? 'meals' : 'cocktails'])
      : [];

    const inProgressIds = inProgressByPathname.map((strId) => parseInt((strId), 10));

    const checkInProgressId = inProgressIds
      .some((recipeId) => recipeId === parseInt((id), 10));

    if (checkInProgressId) setButtonChange(false);
  }, [setButtonChange, id, pathnameAPI]);

  const handleClick = () => {
    setRedirectToInProgress(true);
  };

  if (redirectToInProgress) {
    return <Redirect to={ `${pathnameAPI}/${id}/in-progress` } />;
  }

  return (
    <button
      type="button"
      className="button-iniciar"
      onClick={ handleClick }
      data-testid="start-recipe-btn"
    >
      {buttonChange ? 'Iniciar Receita' : 'Continuar Receita'}
    </button>
  );
}
