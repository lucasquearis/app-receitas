import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
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

export default RecipeDetails;
