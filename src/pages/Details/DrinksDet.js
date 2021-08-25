import React from 'react';

function DrinksDetails() {
  // const [recipesDrink, setRecipesDrink] = useState([]);
  // useEffect(() => {
  //   const getRecipesDrink = async () => {
  //     const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'; // alterar id
  //     const { results } = await fetch(endpoint).then((data) => data.json());
  //     setRecipesDrink(results);
  //   };
  //   getRecipesDrink();
  // }, []);

  // const dataRecipesDrink = [...recipesDrink];
  const index = 0; // Valor dinâmico

  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="" />
      <h2 data-testid="recipe-title">Titulo da bebida</h2>
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
        title="drink-food"
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

export default DrinksDetails;
