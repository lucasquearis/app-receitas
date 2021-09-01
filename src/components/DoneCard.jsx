import { string } from 'prop-types';
import React from 'react';

function DoneCard(props) {
  const { title, thumb, index, area, alcoholicOrNot, category } = props;
  return (
    <div className="div-card">
      <section className="section-card">
        <div className="div-card">
          <span
            className="card-title"
            data-testid={ `${index}-horizontal-name` }
          >
            {title}
          </span>
          <img
            className="card-img"
            src={ thumb }
            alt="thumb"
            data-testid={ `${index}-horizontal-image` }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area || alcoholicOrNot} - ${category}`}
          </span>
        </div>
      </section>
    </div>
  );
}

DoneCard.propTypes = {
  title: string,
  thumb: string,
  index: string,
  area: string,
  alcoholicOrNot: string,
  category: string,
}.isRequired;

export default DoneCard;
