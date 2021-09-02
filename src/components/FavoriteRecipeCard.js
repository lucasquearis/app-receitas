import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';
import { clipboardCopy } from '../utils';

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
    <div className="fvt-recipe-card">
      <input
        className="fvt-image-card"
        type="image"
        src={ img }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => { setIdDetails(id); setTypeDetails(type); } }
      />
      <div className="fvt-card-info">
        <div className="fvt-card-title">
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
            <span className="fvt-link" data-testid={ `${index}-horizontal-name` }>
              {name}
            </span>
          </Link>
        </div>
        <div className="fvt-card-icons">
          <input
            src={ shareIcon }
            alt="Share Button"
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => clipboardCopy(type, id) }
          />
          <input
            src={ blackHeartIcon }
            alt="Favorite Button"
            type="image"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeFavorite(id) }
          />
          <span id={ `share-text${id}` } />
        </div>
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
