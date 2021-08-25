import { string } from 'prop-types';
import React from 'react';

function ItemCard(props) {
  const { title, thumb, id, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h1 data-testid={ `${index}-card-name` }>{title}</h1>
      <img src={ thumb } alt="thumb" data-testid={ `${index}-card-img` } />
      <p>{id}</p>
    </div>
  );
}

export default ItemCard;

ItemCard.propTypes = {
  title: string,
  thumb: string,
  id: string,
  index: string,
}.isRequired;
