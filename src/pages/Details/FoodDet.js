import React, { useState, useEffect } from 'react';

function FoodDetails() {
  const [recipesFood, setRecipesFood] = useState([]);
  useEffect(() => {
    const getRecipesFood = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'; // alterar Id
      const { results } = await fetch(endpoint).then((data) => data.json());
      setRecipesFood(results);
      console.log(results);
    };
    getRecipesFood();
  }, []);

  // const dataRecipesFood = [...recipesFood];
  const index = 0; // valor dinâmico

  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="" />
      <h2 data-testid="recipe-title">Titulo da comida</h2>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Adicionar aos favoritos</button>
      <p data-testid="recipe-category">Texto da categoria</p>
      <div>
        <h3>Ingredientes</h3>
        <ul>
          <li data-testid={ `${index}-ingredient-name-and-measure` }>Ingrediente1</li>
        </ul>
      </div>
      <p data-testid="instructions">Intruções</p>
      <iframe
        title="food-video"
        data-testid="video"
        width="100%"
        height="315"
        src=""
      />
      <div data-testid={ `${index}-recomendation-card` }>Card Receitas recomendadas</div>
      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </div>
  );
}

export default FoodDetails;
