import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import StartContinueDoneButton from './StartContinueDoneButton';
import IngredientList from './IngredientList';

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

const RecomendExist = (objeto) => {
  if (objeto === null || objeto === undefined) return null;
  return objeto;
};

function Details(props) {
  const { Receita, DetailedRecipe, RecomendedRecipe, Id } = props;

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
        <ShareButton type={ Receita } id={ Id } />
        <FavoriteButton recipe={ DetailedRecipe } id={ Id } type={ Receita } />
      </div>
      <h3 data-testid="recipe-category">{DetailedRecipe.category}</h3>
      { DetailedRecipe && Receita === 'bebidas'
        ? <h3 data-testid="recipe-category">{DetailedRecipe.type}</h3>
        : null}
      <h2>Ingredientes</h2>

      <div className="ingredients">
        <lo>
          <IngredientList array={ DetailedRecipe } />
        </lo>
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
        <StartContinueDoneButton id={ Id } type={ Receita } />
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
  RecomendedRecipe: objectOf(string.isRequired).isRequired,
};

export default Details;
