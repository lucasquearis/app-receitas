import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useCopy from '../../hooks/useCopy';
import { Category, Favorite, Image, ShareButton, Title } from '../Details/styles';
import { Span } from '../SearchBar/styles';
import { RecipesContext } from '../../context/RecipesContext';

function DoneCard({ recipe, index, addToFav }) {
  const { copy, share } = useCopy();
  const { history } = useContext(RecipesContext);

  return (
    <div>
      <Image
        onClick={ () => history.push(`${recipe.type}s/${recipe.id}`) }
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <Category data-testid={ `${index}-horizontal-top-text` }>
        { `${recipe.area} - ${recipe.category} - ${recipe.alcoholicOrNot}`}
      </Category>
      <Title
        onClick={ () => history.push(`${recipe.type}s/${recipe.id}`) }
        data-testid={ `${index}-horizontal-name` }
      >
        {recipe.name}
      </Title>
      <Span
        data-testid={ `${index}-horizontal-done-date` }
      >
        {recipe.doneDate || null}
      </Span>
      <ShareButton
        onClick={ () => share(recipe.id, recipe.type) }
        data-testid={ `${index}-horizontal-share-btn` }
        src="/images/shareIcon.svg"
      >
        {copy}
      </ShareButton>
      <Favorite
        src="/images/blackHeartIcon.svg"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => addToFav(recipe) }
      >
        Favoritar
      </Favorite>
      { typeof recipe.tags !== 'string' && recipe.tags ? recipe.tags.map((e) => (
        <span key={ e } data-testid={ `${index}-${e}-horizontal-tag` }>{e }</span>
      )) : ''}
    </div>
  );
}

DoneCard.propTypes = {
  recipe: PropTypes.objectOf(String).isRequired,
  index: PropTypes.number.isRequired,
  addToFav: PropTypes.func.isRequired,
};

export default DoneCard;
