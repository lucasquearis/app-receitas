import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

export default function IniciarButton() {
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
    const checkMeals = mealsId.map((meal) => parseInt(meal));
    const checkCocktails = cocktailsId.map((cocktails) => parseInt(cocktails));
    
    const mockId = 4059302;
    const checkMealsId = checkMeals.some((mealsId) => mockId === mealsId);
    const checkCocktailsId = checkCocktails.some((cocktailsId) => mockId === cocktailsId);
    
    if ( checkMealsId || checkCocktailsId ) {
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
