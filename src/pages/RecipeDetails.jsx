import React from 'react';

export default function Profile() {
  return (
    <div>
      <img src="" alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">titulo</h1>
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <div>
        <h2>Ingredients</h2>
        <p data-testid={ `${0}-ingredient-name-and-measure` }>ingredient</p>
      </div>
      <div>
        <h2 data-testid="instructions">Introdutions</h2>
        <p>introduct</p>
      </div>
      <div>
        <h3>Video</h3>
        <span data-testid="video">vid</span>
      </div>
      <div>
        <h2>Redomendadas</h2>
        <div data-testid={ `${0}-recomendation-card` }>
          cards
        </div>
      </div>
      <button type="button">Iniciar Receita</button>
    </div>
  );
}
