import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const IngredientList = (array) => {
  const texthandle = '-ingredient-name-and-measure';
  const obj = array[0].map((n, index) => (
    n[1] !== '' && n[1] !== null
      ? <li data-testid={ `${index}${texthandle}` }>{n[1]}</li>
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
        <button
          type="button"
          className="RecommendCard"
          data-testid={ `${index}-recomendation-card` }
        >
          <img className="RecomendImg" alt="recomendamos!" src={ n.strDrinkThumb } />
          <p>{n.strDrink}</p>
        </button>

      </Link>
    ));
    return obj.slice(0, recomendlegth);
  }
  if (type === 'bebidas' && array.meals) {
    const obj = array.meals.map((n, index) => (
      <Link key={ index } to={ `/comidas/${n.idMeal}` }>
        <button
          Type="button"
          className="RecommendCard"
          data-testid={ `${index}-recomendation-card` }
        >
          <img className="RecomendImg" alt="recomendamos!" src={ n.strMealThumb } />
          <p>{n.strMeal}</p>
        </button>
      </Link>
    ));
    return obj.slice(0, recomendlegth);
  }
};

const measureList = (array) => {
  const texthandle = '-ingredient-name-and-measure';
  const obj = array[0].map((n, index) => (
    n[1] !== '' && n[1] !== null
      ? <li className="nodot" data-testid={ `${index}${texthandle}` }>{n[1]}</li>
      : null
  ));
  return obj;
};

const RecomendExist = (objeto) => {
  if (objeto === null || objeto === undefined) return null;
  return objeto;
};

function Details(props) {
  const { Receita, DetailedRecipe, RecomendedRecipe } = props;
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
        <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        <button type="button">
          <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="white-heart" />
        </button>
      </div>
      <h3 data-testid="recipe-category">{DetailedRecipe.category}</h3>
      { DetailedRecipe && Receita === 'bebidas'
        ? <h3 data-testid="recipe-category">{DetailedRecipe.type}</h3>
        : null}
      <h2>Ingredientes</h2>

      <div className="ingredients">
        <lo>{IngredientList(DetailedRecipe.ingredients)}</lo>
        <lo>{measureList(DetailedRecipe.measures)}</lo>
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
      <Button
        className="button-details"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita

      </Button>
    </div>
  );
}

const { string, shape, objectOf } = PropTypes;
Details.propTypes = {
  Receita: string.isRequired,
  DetailedRecipe: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string.isRequired,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,
  RecomendedRecipe: objectOf(string).isRequired,
};

export default Details;
