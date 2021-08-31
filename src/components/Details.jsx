import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import shareButton from '../services/Sharebutton';
import FavoriteButton from './FavoriteButton';

const IngredientList = (array) => {
  const texthandle = '-ingredient-name-and-measure';
  const obj = array[0].map((n, index) => (
    n[1] !== '' && n[1] !== null
      ? <li key={ index } data-testid={ `${index}${texthandle}` }>{n[1]}</li>
      : null
  ));
  return obj;
};

const RecomendList = (array, type) => {
  const recomendlegth = 6;
  if (array === null || array === undefined || type === undefined) return <p>2</p>;
  if (type === 'comidas' && array.drinks) {
    const obj = array.drinks.map((n, index) => (
      <Link key={ index } to={ `/bebidas/${n.idDrink}` }>
        <div
          className="RecommendCard"
          data-testid={ `${index}-recomendation-card` }
        >
          <p
            data-testid={ `${index}-recomendation-title` }
            className="recipeName"
          >
            {n.strDrink}
          </p>
          <img className="RecomendImg" alt="recomendamos!" src={ n.strDrinkThumb } />
        </div>

      </Link>
    ));
    return obj.slice(0, recomendlegth);
  }
  if (type === 'bebidas' && array.meals) {
    const obj = array.meals.map((n, index) => (
      <Link key={ index } to={ `/comidas/${n.idMeal}` }>
        <div
          className="RecommendCard"
          data-testid={ `${index}-recomendation-card` }
        >
          <p
            data-testid={ `${index}-recomendation-title` }
            className="recipeName"
          >
            {n.strMeal}
          </p>
          <img className="RecomendImg" alt="recomendamos!" src={ n.strMealThumb } />
        </div>
      </Link>
    ));
    return obj.slice(0, recomendlegth);
  }
};

const measureList = (array) => {
  const txthd = '-ingredient-name-and-measure';
  const obj = array[0].map((n, index) => (
    n[1] !== '' && n[1] !== null
      ? <li className="nodot" key={ index } data-testid={ `${index}${txthd}` }>{n[1]}</li>
      : null
  ));
  return obj;
};

const RecomendExist = (objeto) => {
  if (objeto === null || objeto === undefined) return null;
  return objeto;
};

function Details(props) {
  const { Receita, DetailedRecipe, RecomendedRecipe, Id, ProgressValidation } = props;
  const [copiedbutton, setcopy] = useState(false);

  return (
    <div className="body-details">
      <img
        className="imgtittle"
        data-testid="recipe-photo"
        src={ DetailedRecipe.img }
        alt="detalhes"
      />
      <h1 data-testid="recipe-title">{DetailedRecipe.tittle}</h1>
      <div>
        <button
          type="button"
          onClick={ () => { shareButton(Receita, Id); setcopy(true); } }
        >
          <img alt="share" data-testid="share-btn" src={ shareIcon } />
          <p>
            {copiedbutton ? <p>Link copiado!</p> : ''}
          </p>
        </button>
        <FavoriteButton type={ Receita } id={ Id } />
      </div>
      <h3 data-testid="recipe-category">{DetailedRecipe.category}</h3>
      { DetailedRecipe && Receita === 'bebidas'
        ? <h3 data-testid="recipe-category">{DetailedRecipe.type}</h3>
        : null}
      <h2>Ingredientes</h2>

      <div className="ingredients">
        <l>{IngredientList(DetailedRecipe.ingredients)}</l>
        <l>{measureList(DetailedRecipe.measures)}</l>
      </div>
      <h2>Instruções</h2>
      <p data-testid="instructions">{DetailedRecipe.Instructions}</p>
      {
        Receita === 'comidas'
          ? <iframe title="mov" data-testid="video" src={ DetailedRecipe.youlink } />
          : null
      }
      <h2 data-testid="1-recomendation-title">Recomendadas</h2>
      <div className="sugestions">
        {RecomendList(RecomendExist(RecomendedRecipe), Receita)}
      </div>
      <Link to={ `/${Receita}/${Id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button-details"
        >
          {ProgressValidation ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </Link>
    </div>
  );
}

const { string, shape, objectOf } = PropTypes;
Details.propTypes = {
  Receita: string.isRequired,
  Id: string.isRequired,
  DetailedRecipe: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,
  ProgressValidation: PropTypes.bool.isRequired,
  RecomendedRecipe: objectOf(string.isRequired).isRequired,
};

export default Details;
