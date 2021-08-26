import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Redirect } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import foodsEdrinks from '../mocks/foodsEdrinks';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../cssPages/ReceitasF.css';

function ReceitasFeitas() {
  const [finishRecipes, SetFinishRecipes] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const minNumber = 2;
  const copy = require('clipboard-copy');

  useEffect(() => {
    SetFinishRecipes(foodsEdrinks);
  }, []);

  function onCopy(type, id) {
    copy(`http://localhost:3000/${type}/${id}`);
  }

  function onLink(type, id) {
    setRedirect(`/${type}s/${id}`);
  }

  function onClick({ target: { name } }) {
    const filtroBebidas = foodsEdrinks.filter((bebida) => bebida.type === 'bebida');
    const filtroComidas = foodsEdrinks.filter((comida) => comida.type === 'comida');
    if (name === 'bebida') SetFinishRecipes(filtroBebidas);
    if (name === 'comida') SetFinishRecipes(filtroComidas);
    if (name === 'all') SetFinishRecipes(foodsEdrinks);
  }

  if (redirect) return <Redirect to={ redirect } />;
  return (
    <div>
      <Header titulo="Receitas Feitas" pesquisa="false" />
      <div className="buttons">
        <button
          name="all"
          type="button"
          onClick={ onClick }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          name="comida"
          type="button"
          onClick={ onClick }
          data-testid="filter-by-food-btn"
        >
          Food

        </button>
        <button
          name="bebida"
          type="button"
          onClick={ onClick }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
      </div>
      <CardGroup className="paiDeTodos">
        {finishRecipes.map((recipe, index) => (
          <Card
            name={ recipe.name }
            style={ { width: '18rem' } }
            key={ index }
          >
            <Card.Img
              data-testid={ `${index}-horizontal-image` }
              variant="top"
              onClick={ () => onLink(recipe.type, recipe.id) }
              src={ `${recipe.image}` }
            />
            <Card.Body>
              <div className="paizao">
                <Card.Title
                  data-testid={ `${index}-horizontal-name` }
                  onClick={ () => onLink(recipe.type, recipe.id) }
                >
                  { recipe.name }
                </Card.Title>
                <button type="button" className="button-filtro">
                  <img
                    className="shareIcon"
                    alt={ recipe.name }
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
              </div>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.area.length === 0 ? recipe.alcoholicOrNot : recipe.area} - 
                ${recipe.category}`}

              </Card.Subtitle>
              <Card.Text data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </Card.Text>

              <ListGroup variant="flush">
                {
                  recipe.tags.length === 0 ? ''
                    : recipe.tags.map((tag, count) => count > minNumber || (
                      <ListGroup.Item
                        key={ count }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {' '}
                        {tag}
                        {' '}
                      </ListGroup.Item>))
                }
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>

    </div>
  );
}

export default ReceitasFeitas;
