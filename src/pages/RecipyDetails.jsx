import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipyDetails.css';

/*
solução da lógica para achar palavras iguais
https://pt.stackoverflow.com/questions/3021/como-posso-checar-se-uma-string-cont%C3%A9m-outra-em-javascript
 */

const returnUrl = (id, receita) => {
  const URL_COMIDA = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URL_BEBIDA = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return receita === 'comidas' ? URL_COMIDA : URL_BEBIDA;
};

const IngredientList = (array) => {
  const texthandle = '-ingredient-name-and-measure';
  const obj = array[0].map((n, index) => (
    n[1] !== '' && n[1] !== null
      ? <li data-testid={ `${index}${texthandle}` }>{n[1]}</li>
      : null
  ));
  return obj;
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

const DataManeger = (data, receita) => {
  if (receita === 'comidas' && data) {
    const { meals } = data;
    const indexofsamestring = -1;
    const ingredients = Object.entries(meals[0])
      .filter((n) => n[0].indexOf('strIngredient') !== indexofsamestring);
    const measures = Object.entries(meals[0])
      .filter((n) => n[0].indexOf('strMeasure') !== indexofsamestring);
    const obj = {
      tittle: meals[0].strMeal,
      img: meals[0].strMealThumb,
      area: meals[0].strArea,
      youlink: meals[0].strYoutube,
      category: meals[0].strCategory,
      Instructions: meals[0].strInstructions,
      tag: meals[0].strTags,
      ingredients: [ingredients],
      measures: [measures],
    };
    return obj;
  }
  const { drinks } = data;
  const indexofsamestring = -1;
  const ingredients = Object.entries(drinks[0])
    .filter((n) => n[0].indexOf('strIngredient') !== indexofsamestring);
  const measures = Object.entries(drinks[0])
    .filter((n) => n[0].indexOf('strMeasure') !== indexofsamestring);
  const objdrink = {
    tittle: drinks[0].strDrink,
    img: drinks[0].strDrinkThumb,
    type: drinks[0].strAlcoholic,
    category: drinks[0].strCategory,
    Instructions: drinks[0].strInstructions,
    tag: drinks[0].strTags,
    ingredients: [ingredients],
    measures: [measures],
  };
  return objdrink;
};

function RecipyDetails() {
  const [data, setData] = useState(undefined);

  const { id, receita } = useParams();

  useEffect(() => {
    const fetchEffect = async () => {
      try {
        const fetchApi = await fetch(returnUrl(id, receita));
        const thedata = await fetchApi.json();
        const managedData = DataManeger(thedata, receita);
        setData(managedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEffect();
  }, [id, receita]);

  return (
    data
      ? <>
        <img
          className="imgtittle"
          data-testid="recipe-photo"
          src={ data.img }
          alt="detalhes"
        />
        <h1 data-testid="recipe-title">{data.tittle}</h1>
        <div>
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
          <button type="button">
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="white-heart" />
          </button>
        </div>
        <h3 data-testid="recipe-category">{data.category}</h3>
        { data && receita === 'bebidas'
          ? <h3 data-testid="recipe-category">{data.type}</h3>
          : null}
        <h2>Ingredientes</h2>

        <div className="ingredients">
          <lo>{ IngredientList(data.ingredients) }</lo>
          <lo>
            { measureList(data.measures) }
          </lo>
        </div>
        <h2>Instruções</h2>
        <p data-testid="instructions">{data.Instructions}</p>
        {
          receita === 'comidas'
            ? <iframe title="vid" data-testid="video" width="50%" src={ data.youlink } />
            : null
        }
        <h2>Recomendadas</h2>
        <div>
          <div data-testid="0-recomendation-card">cards recomendadas</div>
          <div data-testid="0-recomendation-card">cards recomendadas</div>
        </div>
        <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
      </>
      : <h1>Loading</h1>
  );
}

export default RecipyDetails;
