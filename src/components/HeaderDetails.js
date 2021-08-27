import React, { useContext } from 'react';
import myContext from '../context/myContext';
// import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function HeaderDetails() {
  const { recipe, keyType } = useContext(myContext);
  const type = keyType === 'meals' ? 'Meal' : 'Drink';
  return (
    <div className="imagem-container">
      <img
        className="imagem"
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
        <button data-testid="favorite-btn" type="button">favorite</button>
        <ShareButton />
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
