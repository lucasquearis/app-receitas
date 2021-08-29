import React, { useContext } from 'react';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import myContext from '../context/myContext';

export default function HeaderDetails() {
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
        <FavoriteButton />
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
