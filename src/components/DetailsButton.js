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
    const mock = {
      cocktails: {
        11007: ['a,b,c'],
        11017: ['a,b,c'],
      },
      meals: {
        4059302: ['b,c,d'],
        4059322: ['b,c,d'],
      },
    };
    const mockStorage = JSON.stringify(mock);
    localStorage.setItem('inProgressRecipes', mockStorage);

    const checkInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const cocktailsId = Object.keys(checkInProgressRecipes.cocktails);
    const mealsId = Object.keys(checkInProgressRecipes.meals);
    const checkMeals = mealsId.map((meal) => parseInt((meal), 10));
    const checkCocktails = cocktailsId.map((cocktails) => parseInt((cocktails), 10));

    const mockId = 4059302;
    const checkMealsId = checkMeals.some((meals) => mockId === meals);
    const checkCocktailsId = checkCocktails.some((cocktails) => mockId === cocktails);

    if (checkMealsId || checkCocktailsId) {
      setButtonChange(false);
    }
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
