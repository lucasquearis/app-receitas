import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/MyContext';
import ButtonDetailMain from '../components/ButtonDetailMain';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
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
  const [recipe, setRecipe] = useState(false);
  const [recommended, setRecommended] = useState(false);

  useEffect(() => {
    handleClick(fetchTranslator[type], 'procuraId', id, setRecipe);
    handleClick(fetchTranslator[recommendedType], 'procuraComida', '', setRecommended);
  }, [handleClick, id, recommendedType, type]);

  console.log(recommended);

  // Variáveis provenientes das informações dos fetchs utilizadas na página - podem ser substituidas depois
  const recipeData = recipe ? Object.values(recipe)[0][0] : {};
  const recommendedData = recommended
    ? Object.values(recommended)[0].slice(0, recommendedQuantity) : null;
  const [showIndex, setShowIndex] = useState(0);

  console.log(recipeData);
  console.log(recommendedData);

  const favoriteObject = {
    id,
    type: type.slice(0, -1),
    area: recipeData.strArea ? recipeData.strArea : '',
    category: recipeData.strCategory,
    alcoholicOrNot: recipeData.strAlcoholic ? recipeData.strAlcoholic : '',
    name: recipeData[`str${jsonTranslator[type]}`],
    image: recipeData[`str${jsonTranslator[type]}Thumb`],
    // Requisito 46 MANDA NÃO TER AS 2 chaves abaixo
    // doneDate: isDone ? 'data' : '',
    // tags: recipeData.strTags,
  };

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

  const recommendedCard = (object, index) => {
    const hideCard = Math.floor(index / 2) !== showIndex ? ' hideCard' : '';
    return (
      <div
        className={ `recommendedCard${hideCard}` }
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
        <h3 data-testid={ `${index}-recomendation-title` }>
          {object[`str${jsonTranslator[recommendedType]}`]}
        </h3>
      </div>
    );
  };

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
      <h1 data-testid="recipe-title">{recipeData[`str${jsonTranslator[type]}`]}</h1>
      <ButtonShare />
      <ButtonFavorite { ...favoriteObject } />
      <h2 data-testid="recipe-category">
        {type === 'comidas' ? recipeData.strCategory : recipeData.strAlcoholic}
      </h2>
      <br />
      <h3>Ingradients</h3>
      <ul>
        {Object.keys(recipeData)
          .filter((key) => key.includes('strIngredient')
            && recipeData[key] !== null && recipeData[key] !== '')
          .map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${recipeData[ingredient]}: ${recipeData[`strMeasure${index + 1}`]}`}
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
      <ButtonDetailMain { ...{ pathname, id } } />
    </>
  );
}

export default Detalhes;
