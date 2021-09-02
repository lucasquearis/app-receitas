import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import '../cssPages/ReceitasF.css';
import ShareButton from '../components/ShareButton';

function ReceitasFeitas() {
  const [showRecipes, setShowRecipes] = useState([]);
  const [finishRecipes, setFinishRecipes] = useState([]);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFinishRecipes(favoriteRecipes);
    setShowRecipes(favoriteRecipes);
  }, []);

  function desfavorite(foodName) {
    const desfavoritar = finishRecipes.filter((value) => value.name !== foodName);
    setShowRecipes(showRecipes.filter((value) => value.name !== foodName));
    setFinishRecipes(desfavoritar);
    localStorage.setItem('favoriteRecipes', JSON.stringify(desfavoritar));
  }

  function onLink(type, id) {
    setRedirect(`/${type}s/${id}`);
  }

  function onClick({ target: { name } }) {
    const filtroBebidas = finishRecipes.filter((bebida) => bebida.type === 'bebida');
    const filtroComidas = finishRecipes.filter((comida) => comida.type === 'comida');
    if (name === 'bebida') setShowRecipes(filtroBebidas);
    if (name === 'comida') setShowRecipes(filtroComidas);
    if (name === 'all') setShowRecipes(finishRecipes);
  }

  if (redirect) return <Redirect to={ redirect } />;
  return (
    <>
      <Header titulo="Receitas Favoritas" pesquisa="false" className="textFavorites" />
      <main className="pageRF">
        <div className="btnFavoriteRecipes">
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
                <Card.Body>
                  <div className="paizao">
                    <Card.Title
                      data-testid={ `${index}-horizontal-name` }
                      onClick={ () => onLink(recipe.type, recipe.id) }
                    >
                      { recipe.name }
                    </Card.Title>
                    <ShareButton url={ `http://localhost:3000/${recipe.type}s/${recipe.id}` } index={ index } />
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

    </>
  );
}

export default ReceitasFeitas;
