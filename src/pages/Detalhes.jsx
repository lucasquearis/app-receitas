import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonDetailMain from '../components/ButtonDetailMain';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import VideoEmbed from '../components/VideoEmbed';
import Carousel from '../components/Carousel';
import fetchFoods from '../fetchs/FetchFood';
import '../cssPages/Detalhes.css';

const fetchTranslator = { comidas: 'food', bebidas: 'drink' };
const jsonTranslator = { comidas: 'Meal', bebidas: 'Drink' };
const recommendedQuantity = 6;

function Detalhes() {
  // Declarações de variáveis para saber se é pagina de comida ou bebida e definir o tipo recomendado
  const { pathname } = useLocation();
  const [, type, id] = pathname.split('/');
  const recommendedType = (type === 'comidas') ? 'bebidas' : 'comidas';

  // Variáveis com as informações da receita e dos recomendados e o fetch delas
  const [recipe, setRecipe] = useState(false);
  const [recommended, setRecommended] = useState(false);

  useEffect(() => {
    const detailsFetchs = async (params) => {
      const [kind, action, value, size, callback] = params;
      const apiResult = await fetchFoods(kind, action, value);
      const { meals, drinks } = apiResult;
      let result = meals || drinks;
      result = (size > 1) ? result.slice(0, size) : result[0];
      callback(result);
    };
    detailsFetchs([fetchTranslator[type], 'procuraId', id, 1, setRecipe]);
    detailsFetchs([fetchTranslator[recommendedType], 'procuraComida', '',
      recommendedQuantity, setRecommended]);
  }, [id, recommendedType, type]);

  // Variáveis provenientes da receita em questão
  const { strYoutube: url, strMeal, strDrink } = recipe;
  const recipeName = strDrink || strMeal;

  const favoriteObject = {
    id,
    type: type.replace('s', ''),
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe[`str${jsonTranslator[type]}`],
    image: recipe[`str${jsonTranslator[type]}Thumb`],
  };

  const ingredientsList = () => {
    const arrayList = Object.keys(recipe).filter((key) => key.includes('strIngredient')
      && recipe[key] !== null && recipe[key] !== '');
    return (
      <ul>
        {
          arrayList.map((ing, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${recipe[ing]}: ${recipe[`strMeasure${ing.match(/\d/g).join('')}`]}`}
            </li>
          ))
        }
      </ul>
    );
  };

  if (!recipe || !recommended) return <h1>Carregando...</h1>;

  return (
    <>
      <img
        src={ recipe[`str${jsonTranslator[type]}Thumb`] }
        alt={ recipeName }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipeName}</h1>
      <ButtonShare />
      <ButtonFavorite favoriteObject={ favoriteObject } />
      <h2 data-testid="recipe-category">
        {type === 'comidas' ? recipe.strCategory : recipe.strAlcoholic}
      </h2>
      <br />
      <h3>Ingredients</h3>
      {ingredientsList()}
      <br />
      <h3>Instructions</h3>
      <p data-testid="instructions">
        {recipe.strInstructions}
      </p>
      <br />
      <VideoEmbed videoData={ { url, recipeName } } />
      <br />
      <Carousel recipes={ recommended } />
      <br />
      <ButtonDetailMain renderData={ { pathname, id } } />
    </>
  );
}

export default Detalhes;
