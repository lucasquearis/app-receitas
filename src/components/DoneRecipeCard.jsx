import React from 'react';
import shareIcon from '../images/shareIcon.svg'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

function DoneRecipeCard() {
  return (
    <div className="done-recipe-card">
      <img src={} data-testid="${index}-horizontal-image" />
      <p data-testid="${index}-horizontal-top-text">Categoria</p>
      <img
        data-testid="${index}-horizontal-share-btn"
        src={ shareIcon }
        alt="icone de compartilhar"
      />
      <p data-testid="${index}-horizontal-name">Nome</p>
      <p data-testid="${index}-horizontal-done-date">Data</p>
    </div>
  );
}
// Header.propTypes = {
//   name: PropTypes.string,
// }.isRequired;

export default DoneRecipeCard;
