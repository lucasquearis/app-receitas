import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

export default function IniciarButton() {
  const [redirectToInProgress, setRedirectToInProgress] = useState(false);
  const [buttonChange, setButtonChange] = useState(false);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();  
  const pathnameAPI = pathname.slice(0,8);  

  useEffect(() => {
    const mock = {
      cocktails:{
        11007:["a,b,c"],
      },
      meals:{
        4059302:["b,c,d"],
      }
    };
    const mockStorage = JSON.stringify(mock);
    localStorage.setItem('inProgressRecipes', mockStorage);
    
  
    const checkInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const cocktailsId = Object.keys(checkInProgressRecipes.cocktails);
    const mealsId=Object.keys(checkInProgressRecipes.meals);

    if (pathnameAPI === '/comidas'){
      if (mealsId === id){
        setButtonChange(true);
      }
    } else if(pathnameAPI === '/bebidas') {
      if (cocktailsId === id);
      setButtonChange(true);
    }
    
  },[setButtonChange, id, pathnameAPI])

  const handleClick = () => {
    setRedirectToInProgress(true);
  }

  if (redirectToInProgress) {
    return <Redirect to={`${pathnameAPI}/${id}/in-progress` }/>;
  }

  return (
    <button
        type="button" 
        className="button-iniciar"       
        onClick={ handleClick }
        data-testid="start-recipe-btn"
      >
        {buttonChange ? "Iniciar Receita" : "Continuar Receita"}
      </button>
  );
}
