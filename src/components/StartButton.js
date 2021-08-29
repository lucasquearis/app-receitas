import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';

function StartButton() {
  const [buttonText, setButtonText] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const text = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  useEffect(() => {
    if (localStorage.recipesStarted) {
      const request = JSON.parse(localStorage.getItem('recipesStarted'));
      // const filterLocal = request.filter((recipe) => recipe[text] === id);
      if (request[text] === id) {
        setButtonText(true);
      }
    }
  }, []);

  // const favoriteClick = () => {
  //   if (localStorage.favoriteRecipes && heart === whiteHeartIcon) {
  //     const request = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //     const newLocalStorage = [...request, favorite];
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
  //   }
  //   if (localStorage.favoriteRecipes && heart === blackHeartIcon) {
  //     const request = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //     const filterLocal = request.filter((item) => item.id !== id);
  //     const removeLocalStorage = [...filterLocal];
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(removeLocalStorage));
  //   }
  // };

  const handleClick = () => {
    if (localStorage.recipesStarted) {
      const local = JSON.parse(localStorage.getItem('recipesStarted'));
      console.log(local);
      const filterLocal = local.filter((recipe) => recipe.id !== id);
      console.log(filterLocal);
      const newLocal = [...filterLocal, id];
      console.log(newLocal);
      localStorage.setItem('recipesStarted', JSON.stringify(newLocal));
    }
    localStorage.setItem('recipesStarted', JSON.stringify([id]));
    setButtonText(true);
    setRedirect(true);
  };

  const messageButton = !buttonText ? 'Iniciar Receita' : 'Continuar Receita';
  if (redirect) return <Redirect to={ `${pathname}/in-progress` } />;

  return (
    <button
      className="iniciar-btn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      { messageButton }
    </button>
  );
}

export default StartButton;
