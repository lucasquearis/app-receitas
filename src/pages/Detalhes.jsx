import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonRedirect from '../components/ButtonRedirect';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import VideoEmbed from '../components/VideoEmbed';
import Carousel from '../components/Carousel';
import IngredientsList from '../components/IngredientsList';
import fetchFoods from '../fetchs/FetchFood';
import '../cssPages/Detalhes.css';

const fetchTranslator = { comidas: 'food', bebidas: 'drink' };
const jsonTranslator = { comidas: 'Meal', bebidas: 'Drink' };
const recommendedQuantity = 6;

function Detalhes() {
  // Declarações de variáveis para saber se é pagina de comida ou bebida e definir o tipo recomendado
  const { pathname } = useLocation();
  const [, type, id, renderType] = pathname.split('/');
  const recommendedType = (type === 'comidas') ? 'bebidas' : 'comidas';

  // Variáveis com as informações da receita e dos recomendados e o fetch delas
  const [recipe, setRecipe] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const detailsFetchs = async (params) => {
      const [kind, action, value, size, callback] = params;
      console.log(kind, action, value, size, callback);
      const apiResult = await fetchFoods(kind, action, value);
      const { meals, drinks } = apiResult;
      let result = meals || drinks;
      console.log(result);
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

  const localStrObject = {
    id,
    type: type.replace('s', ''),
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe[`str${jsonTranslator[type]}`],
    image: recipe[`str${jsonTranslator[type]}Thumb`],
    tags: (recipe.strTags) ? recipe.strTags.split(',') : '',
  };

  if (!recipe || !recommended) return <h1>Carregando...</h1>;

  return (
    <>
      <main className="main-details">
        <img
          src={ recipe[`str${jsonTranslator[type]}Thumb`] }
          alt={ recipeName }
          data-testid="recipe-photo"
          className="thumbnail-details"
        />
        <h1 data-testid="recipe-title">{recipeName}</h1>
        <div className="btnIcons">
          <ButtonShare />
          <ButtonFavorite favoriteObject={ localStrObject } />
        </div>
        <h2 data-testid="recipe-category">
          {type === 'comidas' ? recipe.strCategory : recipe.strAlcoholic}
        </h2>
        <br />
        <h3>Ingredients</h3>
        <IngredientsList
          key={ pathname }
          data={ { id, type, renderType, recipe, setCompleted } }
        />
        <br />
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {recipe.strInstructions}
        </p>
        <br />
        <VideoEmbed videoData={ { url, recipeName } } />
        <br />
        <Carousel
          key={ pathname }
          recipes={ { recommended, recommendedType } }
        />
        <br />
      </main>
      <ButtonRedirect
        key={ pathname }
        renderData={ { pathname, id, renderType, completed, localStrObject } }
      />
    </>
  );
}

export default Detalhes;
