import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loagind';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const fetchRecipe = async () => {
        const correctURL = pathname === 'food' ? urlFoods : urlDrinks;
        const request = await fetch(`${correctURL}${idRecipe}`);
        const response = await request.json();
        setRecipe(response);
      };
      setLoading(false);
      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [idRecipe]);

  if (loading) return <Loading />;

  return (
    <section>
      <div>
        <img data-testid="recipe-photo" />
        <div>
          <h2 data-testid="recipe-title">title</h2>
          <button data-testid="share-btn" type="button">share</button>
          <button data-testid="favorite-btn" type="button">favorite</button>
        </div>
        <h4 data-testid="recipe-category">Categorie</h4>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          <li data-testid={ `${index}-ingredient-name-and-measure` }>itens</li>
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">text</p>
      </div>
      <div data-testid="video">video</div>
      <div>
        <p data-testid={ `${index}-recomendation-card` }>recomendations</p>
      </div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </section>
  );
}

export default RecipeDetails;
