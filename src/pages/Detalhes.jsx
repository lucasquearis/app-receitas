import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import '../cssPages/Detalhes.css';

const fetchTranslator = { comidas: 'food', bebidas: 'drink' };
const jsonTranslator = { comidas: 'Meal', bebidas: 'Drink' };
const recommendedQuantity = 6;

function Detalhes() {
  const { pathname } = useLocation();
  const [, type, id] = pathname.split('/');
  const recommendedType = (type === 'comidas') ? 'bebidas' : 'comidas';

  const { handleClick } = useContext(MyContext);
  const [recipe, setRecipe] = useState(false);
  const [recommended, setRecommended] = useState(false);

  useEffect(() => {
    handleClick(fetchTranslator[type], 'procuraId', id, setRecipe);
    handleClick(fetchTranslator[recommendedType], 'procuraComida', '', setRecommended);
  }, [handleClick, id, recommendedType, type]);

  const recipeData = recipe ? (recipe.meals[0] || recipe.drinks[0]) : {};
  const recommendedData = recommended ? (recommended.meals || recommended.drinks) : null;

  if (recommendedData && recommendedData.length > recommendedQuantity) {
    recommendedData.splice(recommendedQuantity);
  }

  console.log(recipeData);
  console.log(recommendedData);

  const videoElement = () => {
    const allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;'
    + 'picture-in-picture';
    return (
      <iframe
        height="480"
        width="853"
        src={ recipeData.strYoutube.replace('/watch?v=', '/embed/') }
        frameBorder="0"
        allow={ allow }
        allowFullScreen
        ng-show="showvideo"
        title={ `${recipeData[`str${jsonTranslator[type]}`]} Video` }
        data-testid="video"
      />
    );
  };

  const recommendedCard = (object, index) => (
    <div
      className="recommendedCard"
      data-testid={ `${index}-recomendation-card` }
      key={ index }
    >
      <img
        src={ object[`str${jsonTranslator[recommendedType]}Thumb`] }
        alt={ object[`str${jsonTranslator[recommendedType]}`] }
      />
      <p>
        {object.strCategory}
      </p>
      <h3>{ object[`str${jsonTranslator[recommendedType]}`] }</h3>
    </div>
  );

  const recommendedShow = () => (
    <div className="recommendedShow">
      {recommendedData.map((e, i) => recommendedCard(e, i))}
    </div>
  );

  if (!recipe || !recommended) return <h1>Carregando...</h1>;

  return (
    <>
      <img
        src={ recipeData[`str${jsonTranslator[type]}Thumb`] }
        alt={ recipeData[`str${jsonTranslator[type]}`] }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ recipeData[`str${jsonTranslator[type]}`] }</h1>
      <img
        src={ shareIcon }
        alt={ `Share ${jsonTranslator[type]}` }
        data-testid="share-btn"
      />
      <img
        src={ favoriteIcon }
        alt="Favorite"
        data-testid="favorite-btn"
      />
      <h2 data-testid="recipe-category">{recipeData.strCategory}</h2>
      <br />
      <h3>Ingradients</h3>
      <ul>
        {Object.keys(recipeData)
          .filter((key) => key.includes('strIngredient')
          && recipeData[key] !== null && recipeData[key] !== '')
          .map((ingradient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { recipeData[ingradient] }
            </li>
          ))}
      </ul>
      <br />
      <h3>Instructions</h3>
      <p data-testid="instructions">
        {recipeData.strInstructions}
      </p>
      <br />
      {type === 'comidas' && videoElement()}
      <br />
      {recommendedShow()}
      <br />
      <button type="button" data-testid="start-recipe-btn">Inicar Receita</button>
    </>
  );
}

export default Detalhes;
