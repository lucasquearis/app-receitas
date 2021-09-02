import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import share from '../images/shareIcon.svg';

function DoneRecipes() {
  const { localStorageItems } = useContext(MyContext);
  const items = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(items);

  function recipes() {
    function linkToClipboard(id, type) {
      const host = window.location.hostname;
      const { port } = window.location;
      let recipeType;
      const copyDiv = document.getElementById('copiedLink');
      const time = 2000;

      if (type === 'bebidas') {
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
      <div>
        <Header titulo="Receitas Feitas" showSearch={ false } />
        { items && items.map((item, i) => (
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
                  onClick={ () => linkToClipboard(item.id, item.type) }
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
        { console.log(localStorageItems) }
      </div>
    );
  }

  return (
    <div>
      <div>
        <Button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => recipes() }
        >
          All
        </Button>
        <Button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => recipes() }
        >
          Food
        </Button>
        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => recipes() }
        >
          Drinks
        </Button>
      </div>
      <div>
        {
          recipes()
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
