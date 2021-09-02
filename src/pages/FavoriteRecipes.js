import React/* , { useState } */ from 'react';
// import { Link } from 'react-router-dom';
// import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  // const [copyLink, setCopyLink] = useState(false);

  // console.log(favoritesLocalStorage);

  // const [favorites, setFavorites] = useState(favoritesLocalStorage);

  // console.log(favorites.type);

  // const handleCopyClick = () => {
  //   copy(`http://localhost:3000/${favorites.type}s/${favorites.id}`);
  //   setCopyLink(true);
  // };

  return (
    <>
      <Header title="Receitas Favoritas" search={ false } />

      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      <div>
        { favoritesLocalStorage.map((favorite, index) => (
          <div key={ favorite.id }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ favorite.image }
              alt={ favorite.name }
              style={ { width: '100vw' } }
            />

            <h4 data-testid={ `${index}-horizontal-top-text` }>{ favorite.category }</h4>

            <h3 data-testid={ `${index}-horizontal-name` }>{ favorite.name }</h3>

            <p data-testid={ `${index}-horizontal-done-date` }>{ favorite.doneDate }</p>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              // onClick={ () => handleCopyClick() }
            >
              <img
                src={ shareIcon }
                alt="share-btn"
              />
            </button>

            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              <img src={ blackHeartIcon } alt="share-btn" />
            </button>
          </div>

        ))}

      </div>
    </>
  );
}

export default FavoriteRecipes;
