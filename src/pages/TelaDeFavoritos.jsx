import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import foodsEdrinks from '../mocks/foodsEdrinks';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import '../cssPages/ReceitasF.css';
import ShareButton from '../components/ShareButton';

function ReceitasFeitas() {
  const [finishRecipes, SetFinishRecipes] = useState([]);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    SetFinishRecipes(foodsEdrinks);
  }, []);

  function desfavorite(parans) {
    const desfavoritar = foodsEdrinks.filter((bebida) => bebida.name !== parans);
    SetFinishRecipes(desfavoritar);
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
    <main>
      <Header titulo="Receitas Favoritas" pesquisa="false" />
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
      <div className="paiDeTodos">
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
              alt={ recipe.name }
            />
            <Card.Body>
              <div className="paizao">
                <Card.Title
                  data-testid={ `${index}-horizontal-name` }
                  onClick={ () => onLink(recipe.type, recipe.id) }
                >
                  { recipe.name }
                </Card.Title>
                <ShareButton />
                <button
                  type="button"
                  className="button-filtro"
                  name={ recipe.name }
                  onClick={ () => desfavorite(recipe.name) }
                >

                  <img
                    className="shareIcon"
                    alt={ recipe.name }
                    src={ blackHeart }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
              <div
                className="mb-2 text-muted"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.area.length === 0 ? recipe.alcoholicOrNot
                  : `${recipe.area} - ${recipe.category}`}

              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

    </main>
  );
}

export default ReceitasFeitas;
