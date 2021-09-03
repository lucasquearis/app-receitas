import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import StartContinueDoneButton from './StartContinueDoneButton';
import IngredientCheckList from './IngredientCheckList';
import './InProgressMount.css';

export default function InProgressMount(props) {
  const { data } = props;
  const [handleState, setState] = useState(false);
  const { id, type } = useParams();

  return (
    <div className="body-details">
      <img
        className="imgtittle"
        data-testid="recipe-photo"
        src={ data.img }
        alt="detalhes"
      />
      <div className="header-details">
        <h1 className="title-details" data-testid="recipe-title">{data.tittle}</h1>
        <div>
          <ShareButton
            type={ type }
            id={ id }
            datatestid="share-btn"
          />
          <FavoriteButton
            datatestid="favorite-btn"
            recipe={ data }
            id={ id }
            type={ type }
          />
        </div>
      </div>
      <h3 className="title-details" data-testid="recipe-category">{data.category}</h3>
      { data && type === 'bebidas'
        ? <h3 className="title-details" data-testid="recipe-category">{data.type}</h3>
        : null}
      <h2 className="title-details">Ingredientes</h2>

      <div className="ingredients">
        <lo
          onChange={ () => setState(!handleState) }
        >
          <IngredientCheckList
            array={ data }
          />
        </lo>
      </div>
      <h2 className="title-details">Instruções</h2>
      <p className="instructions" data-testid="instructions">{data.Instructions}</p>
      <Link to="/receitas-feitas">
        <StartContinueDoneButton
          id={ id }
          type={ type }
          ingredients={ data }
        />
      </Link>
    </div>
  );
}

const { string, shape } = PropTypes;
InProgressMount.propTypes = {
  data: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,
};
