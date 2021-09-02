import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import myContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';

function HeaderDetails() {
  const { recipe, keyType } = useContext(myContext);
  const type = keyType === 'meals' ? 'Meal' : 'Drink';
  const [share, setShare] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="section-card">
      <img
        className="card-img"
        src={ recipe[`str${type}Thumb`] }
        data-testid="recipe-photo"
        alt={ recipe[`str${type}`] }
      />
      <div className="infos-container">
        <h2
          className="recipe-title"
          data-testid="recipe-title"
        >
          { recipe[`str${type}`] }
        </h2>
        <FavoriteButton />
        <button
          onClick={ () => {
            copy(`http://localhost:3000${pathname}`);
            setShare(true);
          } }
          data-testid="share-btn"
          type="button"
        >
          <img src={ shareIcon } alt="Share Icon" />
        </button>
        { share && <p>Link copiado!</p> }
      </div>
      <h4
        className="recipe-category"
        data-testid="recipe-category"
      >
        { keyType === 'meals' ? recipe.strCategory : recipe.strAlcoholic }
      </h4>
    </div>
  );
}

export default HeaderDetails;
