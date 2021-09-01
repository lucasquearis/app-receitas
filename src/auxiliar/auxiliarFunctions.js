import React from 'react';
import favImageBlack from '../images/blackHeartIcon.svg';
import favImageWhite from '../images/whiteHeartIcon.svg';

export const getFavorites = (id) => {
  const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (allFavorites === null) {
    return favImageWhite;
  }
  const itemFound = allFavorites.find((item) => item.id === id);
  if (itemFound) {
    return favImageBlack;
  }
  return favImageWhite;
};

export const handleClick = (history) => {
  const { location: { pathname } } = history;
  history.push(`${pathname}/in-progress`);
};

export const handleButton = (history) => {
  const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!obj) {
    return (
      <button
        className="fixedbutton"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleClick(history) }
      >
        Iniciar Receita
      </button>
    );
  }
  return (
    <button
      className="fixedbutton"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ () => handleClick(history) }
    >
      Continuar Receita
    </button>
  );
};

export const handleShare = (setLink, id = '') => {
  setLink('Link copiado!');
  let actualLocation;
  if (id.length) {
    actualLocation = `${document.location.origin}/${id}`;
  } else {
    actualLocation = window.location.href;
  }
  const dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.value = actualLocation;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
};

export const handleFavoriteAuxiliar = (objSave, setIcon, icon) => {
  if (icon === favImageWhite) {
    setIcon(favImageBlack);
    const actual = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (actual !== null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...actual, objSave]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objSave]));
    }
  } else {
    setIcon(favImageWhite);
  }
};
