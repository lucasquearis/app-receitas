import React from 'react';

function FoodInfo() {
  return (
    <section>
      <img src="foo" alt="bar" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">Título da Receita</h2>
      <p data-testid="share-btn">Compartilhar</p>
      <p data-testid="favorite-btn">Favorito</p>
      <p data-testid="recipe-category">Texto da Categoria</p>
      <ul>
        {/* <li data-testid={ `${index}-ingredient-name-and-measure` }>
          Ingredientes
        </li> */}
      </ul>
      <p data-testid="instructions">Instruções</p>
      <p data-testid="video">Vídeo</p>
      <section>
        {/* <p data-testid={ `${index}-recomendation-card` }>
          Card de receitas recomendadas
        </p> */}
      </section>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </section>
  );
}

export default FoodInfo;
