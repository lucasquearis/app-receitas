import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/recipeCard.css';

export default function RecomendationCard({ id, name, img, aux, index }) {
  const [idDetails, setIdDetails] = useState(null);
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    if (idDetails) {
      setRedirectToDetails(true);
    }
  }, [idDetails]);

  if (redirectToDetails) {
    return <Redirect to={ `${pathname}/${id}` } />;
  }

  return (
    // <section data-testid={ `${index}-recomendation-card` }>
    //   <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
    //   { aux && <p>{ aux }</p> }
    //   <p data-testid={ `${index}-recomendation-title` }>{ name }</p>
    // </section>
    <button
      type="button"
      className="recipe-card"
      data-testid={ `${index}-recomendation-card` }
      onClick={ () => { setIdDetails(id); } }
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
//   );
// }

// RecomendationCard.propTypes = {
//   name: PropTypes.string.isRequired,
//   img: PropTypes.string.isRequired,
//   aux: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
// };

RecomendationCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  aux: PropTypes.string,
  index: PropTypes.number.isRequired,
};
