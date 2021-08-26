import React from 'react';
import PropTypes from 'prop-types';
import '../styles/recipeCard.css';

export default function RecipeCard({ name, img, aux, index } ) {
  return (
    <section data-testid={ `${index}-recomendation-card` }>
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      { aux && <p>{ aux }</p> }
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </section>
  );
}



RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  aux: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,  
};
