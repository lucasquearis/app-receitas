import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/recipeCard.css';

export default function RecomendationCard({ id, name, img, aux, index }) {
  const [idDetails, setIdDetails] = useState(false);
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const { location: { pathname } } = useHistory();
  const ONE = 1;
  const EIGHT = 8;
  const pathnameURL = pathname.slice(ONE, EIGHT);
  const pathnameFinal = pathnameURL === 'comidas' ? 'bebidas' : 'comidas';

  useEffect(() => {
    if (idDetails) {
      setRedirectToDetails(true);
    }
  }, [idDetails]);

  if (redirectToDetails) {
    return <Redirect to={ `/${pathnameFinal}/${id}` } />;
  }

  return (
    <button
      type="button"
      className="recipe-card"
      data-testid={ `${index}-recomendation-card` }
      onClick={ () => { setIdDetails(true); } }
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
  aux: PropTypes.string,
  index: PropTypes.number.isRequired,
};
