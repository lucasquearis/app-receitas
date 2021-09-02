import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import share from '../images/shareIcon.svg';

function DoneRecipes() {
  const { localStorageItems } = useContext(MyContext);
  const [type, setType] = useState([]);

  const items = JSON.parse(localStorage.getItem('doneRecipes'));

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

  function renderItems() {
    return (
      <div id="cards">
        { items.filter((i) => i.type === type || i.doneDate.includes(type))
          .map((i, index) => (
            <Card
              key={ index }
              data-testid={ `${index}-recipe-card` }
              style={ { width: '10rem' } }
            >
              <Link to={ `/${i.type}s/${i.id}` }>
                <Card.Img
                  data-testid={ `${index}-horizontal-image` }
                  variant="top"
                  src={ i.image }
                />
                <Card.Title data-testid={ `${index}-horizontal-name` }>
                  { i.name }
                </Card.Title>
              </Link>
              <Card.Body>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { i.area }
                  {' - '}
                  { i.category === 'Cocktail' ? 'Alcoholic' : i.category }
                </span>
                <div>
                  <span data-testid={ `${index}-horizontal-done-date` }>
                    { i.doneDate }
                  </span>
                  <button
                    type="button"
                    onClick={ () => linkToClipboard(i.id) }
                  >
                    <img
                      src={ share }
                      alt="share"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                    <div id="copiedLink" />
                  </button>
                </div>
                { i.tags.map((tag) => (
                  <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                    { tag }
                  </span>
                ))}
              </Card.Body>
            </Card>
          ))}
        { console.log(localStorageItems) }
      </div>
    );
  }

  function handleClick({ target }) {
    const { value } = target;
    setType(value);
  }

  return (
    <div>
      <Header titulo="Receitas Feitas" showSearch={ false } />
      <div>
        <Button
          type="button"
          value=""
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
        >
          All
        </Button>
        <Button
          type="button"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ handleClick }
        >
          Food
        </Button>
        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ handleClick }
        >
          Drinks
        </Button>
      </div>
      { renderItems() }

    </div>
  );
}

export default DoneRecipes;
