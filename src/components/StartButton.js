import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

function StartButton() {
  const [buttonText, setButtonText] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const request = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterLocal = request.filter((item) => item.id === id);
      if (filterLocal.length !== 0) {
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
    localStorage.setItem('idRecipe', JSON.stringify([id]));
    setButtonText(true);
  };
  const messageButton = !buttonText ? 'Iniciar Receita' : 'Continuar Receita';

  return (
    <Link to={ `${pathname}/in-progress` }>
      <button
        className="iniciar-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        { messageButton }
      </button>
    </Link>
  );
}
export default StartButton;
