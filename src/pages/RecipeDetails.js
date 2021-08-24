import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const getRecipe = async () => {
      const { match } = props;
      const { type, id } = match.params;
      let endpoint = '';
      if (type === 'comidas') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      const result = await fetch(endpoint).then((response) => response.json());
      setRecipe(result);
    };
    getRecipe();
  }, []);
  const index = 0;
  return (
    <div>
      <object
        type="image/svg+xml"
        data={ blackHeartIcon }
        data-testid="recipe-photo"
      >
        Foto do prato
      </object>
      <h1 data-testid="recipe-title">Título</h1>
      <object type="image/svg+xml" data={ shareIcon } data-testid="share-btn">
        Compartilhar
      </object>
      <object type="image/svg+xml" data={ blackHeartIcon } data-testid="favorite-btn">
        Adicionar a favoritos
      </object>
      <h2 data-testid="recipe-category">Categoria</h2>
      <ul>
        <li data-testid={ `${index}-ingredient-name-and-measure` }>Ingredientes</li>
      </ul>
      <p data-testid="instructions">Instruções</p>
      <iframe title="Video" data-testid="video" src="https://www.youtube.com/embed/kJkQFVqySUw" />
      <div data-testid={ `${index}-recomendation-card` }>Recomendações</div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.arrayOf([
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ]).isRequired,
};

export default RecipeDetails;
