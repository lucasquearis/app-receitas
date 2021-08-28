import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function HeaderDetails(
  { area, name, img, aux, categoryDrink, alcoholic = '' },
) {
  const [copySuccess, setCopySuccess] = useState('');
  const [changeHeart, setChangeHeart] = useState(whiteHeartIcon);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const EIGHT = 8;
  const pathnameAPI = pathname.slice(0, EIGHT);
  const mockID = 123456;

  const sendFavorite = [{
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  }];  

  const handleShare = () => {
    // Source: https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopySuccess('Link copiado!');
  };

  useEffect(() => {
    const mock = [{
      id: 123456,
      // type,
      area,
      category: aux,
      alcoholicOrNot: alcoholic,
      name,
      image: img,
    }];
    const mockStorage = JSON.stringify(mock);
    localStorage.setItem('favoriteRecipes', mockStorage);    

    // const checkIsFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const checkId = checkIsFavorite.map((checkedId) => checkedId.id);    
    // const favoriteId = checkId.some((storageId) => storageId === id);    

    // favoriteId ? setChangeHeart(blackHeartIcon) : setChangeHeart(whiteHeartIcon);  
    checkFavorite ? setChangeHeart(blackHeartIcon) : setChangeHeart(whiteHeartIcon);   
    
  }, [setChangeHeart, id, pathnameAPI, alcoholic, area, aux, img, name]);

  const checkFavorite = () => {
    const checkIsFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const checkId = checkIsFavorite.map((checkedId) => checkedId.id);    
    const favoriteId = checkId.some((storageId) => storageId === id);    
    return(favoriteId);
  }

  const handleFavorite = () => {
    const checkIsFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const localStorageId = checkIsFavorite.map((recipe) => recipe.id);
    const checkFavoriteId = localStorageId.some((storageId) => id === storageId);
    const finalLocalStorage = checkIsFavorite.filter((recipeFav) => recipeFav.id !== id);

    if (checkFavoriteId) {
      localStorage.setItem('favoriteRecipes', finalLocalStorage);
      setChangeHeart(whiteHeartIcon);
    } else {
      const type = pathnameAPI.slice(0, 7);
      const favorite = [{
        id,
        type,
        area,
        category: aux,
        alcoholicOrNot: alcoholic,
        name,
        image: img,
      }];
      localStorage.setItem('favoriteRecipes', favorite);
      setChangeHeart(blackHeartIcon);
    }

    // if (id !== recipeId) {

    //     setChangeHeart(blackHeartIcon);
    //   }
    //   if (pathnameAPI === '/bebidas') {
    //     type = 'bebida';
    //     const favorite = [{
    //       id,
    //       type,
    //       area: aux,
    //       category: categoryDrink,
    //       alcoholicOrNot: alcoholic,
    //       name,
    //       image: img,
    //     }];
    //     localStorage.setItem('favoriteRecipes', favorite);
    //     setChangeHeart(blackHeartIcon);
    //   }
  };

  return (
    <header>
      <img src={ img } alt={ name } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ name }</h1>
      <input
        src={ shareIcon }
        alt="Share Icon"
        type="image"
        data-testid="share-btn"
        onClick={ handleShare }
      />
      <input
        src={ changeHeart }
        alt="Favorite Icon"
        type="image"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      />
      <p>{ copySuccess }</p>
      { aux && <p data-testid="recipe-category">{ aux }</p> }
    </header>
  );
}

HeaderDetails.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  aux: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  categoryDrink: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
};
