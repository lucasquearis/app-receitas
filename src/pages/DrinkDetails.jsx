import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Sugestions from '../components/Sugestions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkDetails() {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState({
    ingredients: [],
    measure: [],
  });

  useEffect(() => {
    const filterIngredients = () => {
      const keys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
      const list = keys.map((key) => recipe[key]);
      const measureQnt = Object.keys(recipe).filter((key) => key.includes('Measure'));
      const measureList = measureQnt.map((key) => recipe[key]);
      setLists({
        ...lists,
        ingredients: list.filter((item) => item),
        measure: measureList.filter((item) => item),
      });
    };

    filterIngredients();
  }, [recipe]);

  useEffect(() => {
    try {
      setLoading(true);
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const fetchRecipe = async () => {
        const request = await fetch(`${urlDrinks}${params.id}`); // colocar o id dinânmico
        const response = await request.json();
        setRecipe(response.drinks[0]);
      };
      setLoading(false);
      fetchRecipe();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) return <Loading />;

  const checkIsFavorite = () => (
    favorite ? { blackHeartIcon } : { whiteHeartIcon });

  const handleFavorite = () => setFavorite((previus) => !previus);

  return (
    <section>
      <div>
        <img
          width="250"
          height="200"
          src={ recipe.strDrinkThumb }
          data-testid="recipe-photo"
          alt={ recipe.strDrink }
        />
        <div>
          <h2 data-testid="recipe-title">{ recipe.strDrink }</h2>
        </div>
        <div>
          <button data-testid="share-btn" type="button">SHARE</button>
          <button
            src={ checkIsFavorite }
            onClick={ handleFavorite }
            data-testid="favorite-btn"
            type="button"
          >
            { checkIsFavorite }
          </button>
        </div>
        <h4 data-testid="recipe-category">{ recipe.strAlcoholic }</h4>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {
            lists.ingredients.map((item, key) => (
              <li
                key={ key }
                data-testid={ `${key}-ingredient-name-and-measure` }
              >
                { `${item} - ${lists.measure[key]}` }
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <div>
        <Sugestions type="meals" />
      </div>
      <button
        style={ { position: 'fixed', bottom: '0px' } }
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </section>
  );
}

export default DrinkDetails;
