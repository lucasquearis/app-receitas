import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';
import { clipboardCopy } from '../services';
import '../styles/favoriteRecipeCard.css';

export default function FavoriteRecipeCard({
  id,
  name,
  img,
  index,
  setIdDetails,
  setTypeDetails,
  type,
  alcoholicOrNot,
  area,
  category,
}) {
  const { setFvtRecipes } = useContext(AppContext);

  const removeFavorite = (fvtId) => {
    const fvtRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const findIndex = fvtRecipes.map((recipe) => recipe.id).indexOf(fvtId);
    fvtRecipes.splice(findIndex, 1);
    setFvtRecipes(fvtRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fvtRecipes));
  };

  return (
    <div className="recipe-card">
      <input
        className="image-card"
        type="image"
        src={ img }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => { setIdDetails(id); setTypeDetails(type); } }
      />
      <div>
        { (type === 'bebida') ? (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </span>
        ) : (
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}`}
          </span>
        )}
        <Link to={ `${type}s/${id}` }>
          <span data-testid={ `${index}-horizontal-name` }>
            {name}
          </span>
        </Link>
        <input
          src={ shareIcon }
          alt="Share Button"
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => clipboardCopy(type, id) }
        />
        <span id={ `share-text${id}` }>Compartilhar?</span>
        <input
          src={ blackHeartIcon }
          alt="Favorite Button"
          type="image"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => removeFavorite(id) }
        />
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  setIdDetails: PropTypes.func.isRequired,
  setTypeDetails: PropTypes.func.isRequired,
};
