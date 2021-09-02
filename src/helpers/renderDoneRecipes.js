import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import share from '../images/shareIcon.svg';

const items = JSON.parse(localStorage.getItem('doneRecipes'));
console.log(items);

export default function renderFoods(type) {
  function linkToClipboard(id) {
    const host = window.location.hostname;
    const { port } = window.location;
    let recipeType;
    const copyDiv = document.getElementById('copiedLink');
    const time = 2000;
    if (type === 'bebida') {
      recipeType = '/bebidas/';
    } else {
      recipeType = '/comidas/';
    }
    const fullLink = `http://${host}:${port}${recipeType}${id}`;
    copy(fullLink);
    copyDiv.innerHTML = 'Link copiado!';
    const clear = () => {
      copyDiv.innerHTML = '';
    };
    setTimeout(clear, time);
  }

  return (
    <div id="cards">
      { items.filter((item) => item.type === type).map((item, i) => (
        <Card
          key={ i }
          data-testid={ `${i}-recipe-card` }
          style={ { width: '10rem' } }
        >
          <Link to={ `/${item.type}s/${item.id}` }>
            <Card.Img
              data-testid={ `${i}-horizontal-image` }
              variant="top"
              src={ item.image }
            />
            <Card.Title data-testid={ `${i}-horizontal-name` }>
              { item.name }
            </Card.Title>
          </Link>
          <Card.Body>
            <span data-testid={ `${i}-horizontal-top-text` }>
              { item.area }
              {' - '}
              { item.category === 'Cocktail' ? 'Alcoholic' : item.category }
            </span>
            <div>
              <span data-testid={ `${i}-horizontal-done-date` }>
                { item.doneDate }
              </span>
              <button
                type="button"
                onClick={ () => linkToClipboard(item.id) }
              >
                <img
                  src={ share }
                  alt="share"
                  data-testid={ `${i}-horizontal-share-btn` }
                />
              </button>
            </div>
            { item.tags.map((tag) => (
              <span key={ tag } data-testid={ `${i}-${tag}-horizontal-tag` }>
                { tag }
              </span>
            ))}
            <div id="copiedLink" />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
