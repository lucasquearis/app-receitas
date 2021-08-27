import { arrayOf, number, string } from 'prop-types';
import React from 'react';
import shareIcon from '../../images/shareIcon.svg';
import './Card.css';

function Card(props) {
  const { index, categoria, name, data, tags, imgSrc } = props;
  return (
    <div className="done-card-container">
      <section>
        <img
          src={ imgSrc }
          alt="Imagem da Receita"
          width="165px"
          data-testid={ `${index}-horizontal-image` }
        />
      </section>
      <aside className="side-container">
        <section className="side-step1">
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {categoria}
          </p>
          <button
            type="button"
            className="share-btn"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="Share Icon" width="22px" />
          </button>
        </section>
        <h5
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </h5>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {data}
        </p>
        <section className="tags-container">
          {tags.map((tagName) => (
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
  index: number.isRequired,
  categoria: string.isRequired,
  name: string.isRequired,
  data: string.isRequired,
  tags: arrayOf(string).isRequired,
  imgSrc: string.isRequired,
};

export default Card;
