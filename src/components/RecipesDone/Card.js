import { number, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import './Card.css';

function Card(props) {
  const { id, categoria, name, date, tags, imgSrc, type, index, area } = props;
  let path = '';
  let arrayTags = [];
  if (typeof tags === 'string') {
    arrayTags = tags ? tags.split(',') : [];
  } else {
    arrayTags = tags || [];
  }
  if (arrayTags.length > 1) {
    arrayTags = [arrayTags[0], arrayTags[1]];
  }
  if (type === 'comida') {
    path = `/comidas/${id}`;
  } else {
    path = `/bebidas/${id}`;
  }
  console.log(categoria);
  return (
    <div className="done-card-container">
      <section>
        <Link to={ path }>
          <img
            src={ imgSrc }
            alt="Imagem da Receita"
            width="165px"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </section>
      <aside className="side-container">
        <section className="side-step1">
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {area ? `${area} - ${categoria}` : `${categoria}`}
          </p>
          <ShareBtn
            type={ type }
            id={ id }
            className="share-btn"
            testId={ `${index}-horizontal-share-btn` }
          />
        </section>
        <Link to={ path }>
          <h5
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h5>
        </Link>
        <section className="date-section">
          <p>Feita em: </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {date}
          </p>
        </section>
        <section className="tags-container">
          {arrayTags.map((tagName) => (
            <span
              className="tags-items"
              key={ tagName }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}
            </span>))}
        </section>
      </aside>
    </div>);
}

Card.propTypes = {
  id: string.isRequired,
  categoria: string.isRequired,
  name: string.isRequired,
  date: string.isRequired,
  tags: string,
  imgSrc: string.isRequired,
  type: string.isRequired,
  index: number.isRequired,
  area: string,
};

Card.defaultProps = {
  tags: null,
  area: undefined,
};

export default Card;
