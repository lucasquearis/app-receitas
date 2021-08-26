import React from 'react';

function FoodsRecipeInProgress() {
  // const listaDeIngredientes = ['tomate', 'azeite', 'sal'];

  return (
    <div>
      <p>Componente FoodsRecipeInProgress</p>
      <img data-testid="recipe-photo" alt="recipe" />
      <h1 data-testid="recipe-title">Título receita</h1>
      <button data-testid="share-btn" type="button">btn compartilhar</button>
      <button data-testid="favorite-btn" type="button">btn favoritar</button>

      <h4 data-testid="recipe-category">categoria</h4>
      <div className="indredients">
        <h3>Ingredientes</h3>

        {/* { listaDeIngredientes.map((ingredient, index) => (
          <div data-testid={ `${index}-ingredient-step` } key={ index }>
            <input type="checkbox">
              { `${ingredient}` }
            />

          </div>
        ))
      }
      </div> */}
      </div>

      <h3>Instruções</h3>
      <p data-testid="instructions">texto de instruçoes</p>
      <button data-testid="finish-recipe-btn" type="button">finalizar</button>
    </div>
  );
}

export default FoodsRecipeInProgress;
