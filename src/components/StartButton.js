import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import myContext from '../context/myContext';

function StartButton() {
  const { objRecipeProgress, setObjRecipeProgress, lists } = useContext(myContext);
  const [activeButton, setActiveButton] = useState(false);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const text = pathname.includes('comidas') ? 'meals' : 'cocktails';

  // useEffect(() => {
  //   if (localStorage.favoriteRecipes) {
  //     const request = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //     const filterLocal = request.filter((item) => item.id === id);
  //     if (filterLocal.length !== 0) {
  //       setButtonText(true);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.doneRecipes) {
      const request = JSON.parse(localStorage.getItem('doneRecipes'));
      const result = request.filter((i) => i.id === id);
      if (result.length !== 0) setActiveButton(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.inProgressRecipes) {
      const request = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (Object.keys(request[text]).includes(id)) setContinueRecipe(true);
    }
  }, []);

  const handleClick = () => {
    setObjRecipeProgress({ ...objRecipeProgress,
      [text]: { ...objRecipeProgress[text],
        [id]: [...new Array(lists.ingredients.length).fill(false)] } });
    localStorage.setItem('idRecipe', JSON.stringify([id]));
    // setButtonText(true);
  };

  const mensagem = () => {
    const msn = continueRecipe ? 'Continuar Receita' : 'Iniciar Receita';
    return msn;
  };
  if (activeButton) return '';
  return (
    <Link to={ `${pathname}/in-progress` }>
      <button
        className="iniciar-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        { mensagem() }
      </button>
    </Link>
  );
}
export default StartButton;
