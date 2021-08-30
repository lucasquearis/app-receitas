import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Redirect } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Header from '../components/Header';
import '../cssPages/ReceitasF.css';
import ShareButton from '../components/ShareButton';

function ReceitasFeitas() {
  console.log(1);
  const [showRecipes, setShowRecipes] = useState([]);
  const [finishRecipes, SetFinishRecipes] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const minNumber = 2;

  useEffect(() => {
    console.log(2);
    const doneRecipes = (localStorage.getItem('doneRecipes'))
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    SetFinishRecipes(doneRecipes);
    setShowRecipes(doneRecipes);
  }, []);

  function onLink(type, id) {
    setRedirect(`/${type}s/${id}`);
  }

  function onClick({ target: { name } }) {
    const filtrosReceitas = finishRecipes
      .filter((receita) => receita.type.includes(name));
    setShowRecipes(filtrosReceitas);
  }

  if (redirect) return <Redirect to={ redirect } />;
  return (
    <div>
      <Header titulo="Receitas Feitas" pesquisa="false" />
      <div className="buttons">
        <button
          name=""
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
      {console.log(3, showRecipes.length)}
      <CardGroup className="paiDeTodos">
        {showRecipes.length === 0
          ? 'Lista vazia!' : showRecipes.map((recipe, index) => (
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
                alt={ recipe.name }
              />
              {console.log(4, recipe)}
              <Card.Body>
                <div className="paizao">
                  <Card.Title
                    data-testid={ `${index}-horizontal-name` }
                    onClick={ () => onLink(recipe.type, recipe.id) }
                  >
                    { recipe.name }
                  </Card.Title>
                  <ShareButton url={ `http://localhost:3000/${recipe.type}s/${recipe.id}` } index={ index } />
                </div>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.area.length === 0 ? recipe.alcoholicOrNot
                    : `${recipe.area} - ${recipe.category}`}
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
