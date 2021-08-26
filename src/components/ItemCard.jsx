import { string } from 'prop-types';
import React from 'react';
import '../styles/ItemCard.css';

function ItemCard(props) {
  const { title, thumb, id, index } = props;
  return (
    <div className="div-card" data-testid={ `${index}-recipe-card` }>
      <section className="section-card">
        <span className="card-title" data-testid={ `${index}-card-name` }>{title}</span>
        <img
          className="card-img"
          src={ thumb }
          alt="thumb"
          data-testid={ `${index}-card-img` }
        />
        <span>{id}</span>
      </section>
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
