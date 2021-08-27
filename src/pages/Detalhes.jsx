import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/MyContext';
import ButtonDetailMain from '../components/ButtonDetailMain';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import VideoEmbed from '../components/VideoEmbed';
import Carousel from '../components/Carousel';
import '../cssPages/Detalhes.css';

const fetchTranslator = { comidas: 'food', bebidas: 'drink' };
const jsonTranslator = { comidas: 'Meal', bebidas: 'Drink' };
const recommendedQuantity = 6;

function Detalhes() {
  // Declarações de variáveis para saber se é pagina de comida ou bebida e definir o tipo recomendado
  const { pathname } = useLocation();
  const [, type, id] = pathname.split('/');
  const recommendedType = (type === 'comidas') ? 'bebidas' : 'comidas';

  // Variáveis para realizar Fetch e preencher estados com informações
  const { handleClick } = useContext(MyContext);
  const [recipeAPI, setRecipeAPI] = useState(false);
  const [recommendedAPI, setRecommendedAPI] = useState(false);

  useEffect(() => {
    handleClick(fetchTranslator[type], 'procuraId', id, setRecipeAPI);
    handleClick(fetchTranslator[recommendedType], 'procuraComida', '', setRecommendedAPI);
  }, [handleClick, id, recommendedType, type]);

  console.log(recommendedAPI);

  // Variáveis provenientes das informações dos fetchs utilizadas na página - podem ser substituidas depois
  const recipe = recipeAPI ? Object.values(recipeAPI)[0][0] : {};
  const { strYoutube: url, strMeal, strDrink } = recipe;
  const recipeName = strDrink || strMeal;
  const recommended = recommendedAPI
    ? Object.values(recommendedAPI)[0].slice(0, recommendedQuantity) : null;

  console.log(recipe);
  console.log(recommended);

  const favoriteObject = {
    id,
    type: type.replace('s', ''),
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe[`str${jsonTranslator[type]}`],
    image: recipe[`str${jsonTranslator[type]}Thumb`],
    // Requisito 46 MANDA NÃO TER AS 2 chaves abaixo
    // doneDate: isDone ? 'data' : '',
    // tags: recipeData.strTags,
  };

  if (!recipeAPI || !recommendedAPI) return <h1>Carregando...</h1>;

  return (
    <>
      <img
        src={ recipe[`str${jsonTranslator[type]}Thumb`] }
        alt={ recipe[`str${jsonTranslator[type]}`] }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ RecipeName }</h1>
      <ButtonShare />
      <ButtonFavorite { ...favoriteObject } />
      <h2 data-testid="recipe-category">
        {type === 'comidas' ? recipe.strCategory : recipe.strAlcoholic}
      </h2>
      <br />
      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.includes('strIngredient')
            && recipe[key] !== null && recipe[key] !== '')
          .map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${recipe[ingredient]}: ${recipe[`strMeasure${index + 1}`]}`}
            </li>
          ))}
      </ul>
      <br />
      <h3>Instructions</h3>
      <p data-testid="instructions">
        {recipe.strInstructions}
      </p>
      <br />
      <VideoEmbed { ...{ url, recipeName } } />
      <br />
      <Carousel recommended={ recommended } />
      <br />
      <ButtonDetailMain { ...{ pathname, id } } />
    </>
  );
}

export default Detalhes;
