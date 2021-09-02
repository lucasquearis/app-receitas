import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/recipeCard.css';

export default function RecomendationCard({ id, name, img, pathnameAPI, aux, index }) {
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  if (redirectToDetails) {
    return <Redirect to={ `/${pathnameAPI}/${id}` } />;
  }

  return (
    <button
      type="button"
      className="recipe-card"
      data-testid={ `${index}-recomendation-card` }
      onClick={ () => { setRedirectToDetails(true); } }
    >
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <div>
        { aux && <span>{ aux }</span> }
        <span data-testid={ `${index}-recomendation-title` }>{ name }</span>
      </div>
    </button>
  );
}

RecomendationCard.defaultProps = {
  aux: null,
};

RecomendationCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  pathnameAPI: PropTypes.string.isRequired,
  aux: PropTypes.string,
  index: PropTypes.number.isRequired,
};
