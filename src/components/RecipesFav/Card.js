import { number, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareBtn from '../RecipesDone/ShareBtn';
import './Card.css';
import FavBtn from './FavBtn';

function Card(props) {
  const getFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(getFavRecipes);
  const { id, categoria, name, imgSrc, type, index, area } = props;
  let path = '';

  if (type === 'comida') {
    path = `/comidas/${id}`;
  } else {
    path = `/bebidas/${id}`;
  }

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
        </section>
        <Link to={ path }>
          <h5
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h5>
        </Link>
        <section className="share-fav-btns-container">
          <ShareBtn
            type={ type }
            id={ id }
            className="share-btnFav"
            testId={ `${index}-horizontal-share-btn` }
          />
          <FavBtn
            id={ id }
            favList={ getFavRecipes }
            testId={ `${index}-horizontal-favorite-btn` }
          />
        </section>
      </aside>
    </div>);
}

Card.propTypes = {
  id: string.isRequired,
  categoria: string.isRequired,
  name: string.isRequired,
  imgSrc: string.isRequired,
  type: string.isRequired,
  index: number.isRequired,
  area: string,
};

Card.defaultProps = {
  area: undefined,
};

export default Card;
