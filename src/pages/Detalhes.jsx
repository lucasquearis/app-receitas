import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import favoriteIconTransp from '../images/whiteHeartIcon.svg';
import favoriteIconFull from '../images/blackHeartIcon.svg';
import '../cssPages/Detalhes.css';

const fetchTranslator = { comidas: 'food', bebidas: 'drink' };
const jsonTranslator = { comidas: 'Meal', bebidas: 'Drink' };
const recommendedQuantity = 6;
const copy = require('clipboard-copy');

function Detalhes() {
  // Declarações de variáveis para saber se é pagina de comida ou bebida e definir o tipo recomendado
  const { pathname } = useLocation();
  const [, type, id] = pathname.split('/');
  const recommendedType = (type === 'comidas') ? 'bebidas' : 'comidas';

  // Buscar informações do localStorage
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const isDone = ((doneRecipes.filter(({ id: idDone }) => idDone === id).length) !== 1);
  const inProgress = localStorage.getItem('inProgressRecipes')
    ? localStorage.getItem('inProgressRecipes') : '';
  const recipeinProgress = inProgress.includes(id);
  const favorites = localStorage.getItem('favoriteRecipes')
    ? localStorage.getItem('favoriteRecipes') : '';

  // Variáveis para realizar Fetch e preencher estados com informações
  const { handleClick } = useContext(MyContext);
  const [recipe, setRecipe] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorites.includes(id));

  useEffect(() => {
    handleClick(fetchTranslator[type], 'procuraId', id, setRecipe);
    handleClick(fetchTranslator[recommendedType], 'procuraComida', '', setRecommended);
  }, [handleClick, id, recommendedType, type]);

  console.log(recommended);

  // Variáveis provenientes das informações dos fetchs utilizadas na página - podem ser substituidas depois
  const [redirect, setRedirect] = useState(null);
  const recipeData = recipe ? Object.values(recipe)[0][0] : {};
  const recommendedData = recommended
    ? Object.values(recommended)[0].slice(0, recommendedQuantity) : null;
  const [showIndex, setShowIndex] = useState(0);
  const [showShareMsg, setShowShareMsg] = useState(false);

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

  const mainBtnClick = () => setRedirect(`${pathname}/in-progress`);

  const shareImgClick = () => {
    copy(`http://localhost:3000${pathname}`);
    setShowShareMsg(true);
    setTimeout(() => setShowShareMsg(false), 1500);
  };

  const favoriteImgClick = () => {
    const oldFavorites = (favorites === '') ? [] : JSON.parse(favorites);
    if (isFavorite) {
      const newFavorites = [...oldFavorites]
        .filter(({ id: idFav }) => idFav !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFav = {
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
      const newFavorites = [...oldFavorites, newFav];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
    setIsFavorite(!isFavorite);
  };

  const detailsBtn = () => (
    <button
      className="mainBtn"
      data-testid="start-recipe-btn"
      type="button"
      onClick={ mainBtnClick }
    >
      {recipeinProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );

  if (redirect) return <Redirect to={ redirect } />;

  if (!recipe || !recommended) return <h1>Carregando...</h1>;

  return (
    <>
      <img
        src={ recipeData[`str${jsonTranslator[type]}Thumb`] }
        alt={ recipeData[`str${jsonTranslator[type]}`] }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipeData[`str${jsonTranslator[type]}`]}</h1>
      <img
        src={shareIcon}
        alt={`Share ${jsonTranslator[type]}`}
        data-testid="share-btn"
        onClick={shareImgClick}
      />
      {showShareMsg && <p>Link copiado!</p>}
      <img
        src={ isFavorite ? favoriteIconFull : favoriteIconTransp }
        alt="Favorite"
        data-testid="favorite-btn"
        onClick={favoriteImgClick}
      />
      <h2 data-testid="recipe-category">
        {type === 'comidas' ? recipeData.strCategory : recipeData.strAlcoholic}
      </h2>
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
              {`${recipeData[ingradient]}: ${recipeData[`strMeasure${index + 1}`]}`}
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
      {isDone && detailsBtn()}
    </>
  );
}

export default Detalhes;
