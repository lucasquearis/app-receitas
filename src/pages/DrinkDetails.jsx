import React from 'react';

function DrinkDetails() {
  const index = 1;
  return (
    <div>
      <div>
        <img alt="foto da bebida" data-testid="recipe-photo" />
      </div>
      <div>
        <h2 data-testid="recipe-title">titulo</h2>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favorito</button>
        <p data-testid="recipe-category"> categoria</p>
      </div>
      <section>
        <h3>ingredientes</h3>
        <ul>
          <li data-testid={ `${index}-ingredient-name-and-measure` }>items</li>
        </ul>
      </section>
      <section>
        <p data-testid="instructions">Instruçoes</p>
      </section>
      <div>
        <p data-testid={ `${index}-recomendation-card` }>cards</p>
      </div>
      <div>
        <button type="button" data-testid="start-recipe-btn">iniciar receita</button>
      </div>
    </div>
  );
}

export default DrinkDetails;
