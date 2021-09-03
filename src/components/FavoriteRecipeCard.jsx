import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteRecipes } from '../helpers/setLocalStorage';

export default function FavoriteRecipesCard(props) {
  const {
    category: c,
    thumb, alcoholic: a,
    name,
    index,
    id,
    area,
    type,
    handleFavoriteRemove } = props;

  const [favorite, setFavorite] = useState(false);
  const [clipBoardCopy, setClipBoardCopy] = useState(false);

  const heartIcon = favorite ? blackHeartIcon : whiteHeartIcon;

  useState(() => {
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favorites.some((fav) => fav.id === id);
      setFavorite(isFavorite);
    }
  }, []);

  useEffect(() => {
    favoriteRecipes(props, !favorite);
    if (!favorite) {
      handleFavoriteRemove(name);
    }
  }, [favorite]);

  const urlType = type === 'drinks' ? 'bebidas' : 'comidas';

  const clipboard = () => {
    let url = window.location.href.split('/');
    url = url.splice(0, url.length - 1).join('/');
    url = `${url}/${urlType}/${id}`;
    navigator.clipboard.writeText(url);
    // const fiveSec = 5000;
    setClipBoardCopy(true);
    // setTimeout(() => setClipBoardCop(false), fiveSec);
  };

  const origin = `${area} - ${c}`;

  return (
    <section className="recipe-favorite-card">
      <Link to={ `${urlType}/${id}` }>
        <img
          width="300px"
          data-testid={ `${index}-horizontal-image` }
          src={ thumb }
          alt={ name }
        />
        {!a && <p data-testid={ `${index}-horizontal-top-text` }>{ origin }</p>}
        {a && <p data-testid={ `${index}-horizontal-top-text` }>{ a }</p>}

        <h1
          data-testid={ `${index}-horizontal-name` }
          className="name-recipe-favorite-card"
        >
          {name}

        </h1>
      </Link>
      <div>
        <input
          type="image"
          onClick={ clipboard }
          src={ shareIcon }
          alt="share"
          data-testid={ `${index}-horizontal-share-btn` }
          className="icon-favorite-card"
        />
        {clipBoardCopy && <p>Link copiado!</p>}
        <input
          name={ name }
          type="image"
          alt="favorite"
          src={ heartIcon }
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => setFavorite(!favorite) }
          className="icon-favorite-card"
        />
      </div>
    </section>
  );
}

FavoriteRecipesCard.propTypes = {
  alcoholic: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleFavoriteRemove: PropTypes.func.isRequired,
};
