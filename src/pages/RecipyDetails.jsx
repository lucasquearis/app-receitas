import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipyDetails.css';

/*
solução da lógica para achar palavras iguais
https://pt.stackoverflow.com/questions/3021/como-posso-checar-se-uma-string-cont%C3%A9m-outra-em-javascript
 */

const returnUrl = (id, receita) => {
  const URLCOMIDA = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URLBEBIDA = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URLComidaRec = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const URLBebidaRec = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlRecipe = receita === 'comidas' ? URLCOMIDA : URLBEBIDA;
  const urlRecomend = receita === 'comidas' ? URLBebidaRec : URLComidaRec;
  const objreturn = [urlRecipe, urlRecomend];
  return objreturn;
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

const RecomendList = (array, type) => {
  if (array === null || array === undefined) return null;
  if (type === 'comidas') {
    const obj = array.drinks.map((n, index) => (
      <Link key={ index } to={ `/bebidas/${n.idDrink}` }>
        <button
          type="button"
          className="RecommendCard"
          data-testid={ `${index}-recomendation-card` }
        >
          <img alt="recomendamos!" src={ n.strDrinkThumb } />
          <p>{n.strDrink}</p>
        </button>

      </Link>
    ));
    return obj;
  }
  const obj = array.meals.map((n, index) => (
    <Link key={ index } to={ `/comidas/${n.idMeal}` }>
      <button
        Type="button"
        className="RecommendCard"
        data-testid={ `${index}-recomendation-card` }
      >
        <img alt="recomendamos!" src={ n.strMealThumb } />
        <p>{n.strMeal}</p>
      </button>
    </Link>
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
  const [Data, setDataRecipe] = useState(undefined);
  const [DataRecomend, setDataRecomend] = useState(undefined);

  const { id, receita } = useParams();

  useEffect(() => {
    setDataRecipe(undefined);
    setDataRecomend(undefined);
    const fetchEffect = async () => {
      try {
        const fetchApi = await fetch(returnUrl(id, receita)[0]);
        const thedata = await fetchApi.json();
        const managedData = DataManeger(thedata, receita);
        setDataRecipe(managedData);
        const fetchApiRecomend = await fetch(returnUrl(id, receita)[1]);
        const thedataRecomend = await fetchApiRecomend.json();
        setDataRecomend(thedataRecomend);
        console.log(thedataRecomend);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEffect();
  }, [id, receita]);

  if (Data) {
    return (
      <>
        <img
          className="imgtittle"
          data-testid="recipe-photo"
          src={ Data.img }
          alt="detalhes"
        />
        <h1 data-testid="recipe-title">{Data.tittle}</h1>
        <div>
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
          <button type="button">
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="white-heart" />
          </button>
        </div>
        <h3 data-testid="recipe-category">{Data.category}</h3>
        { Data && receita === 'bebidas'
          ? <h3 data-testid="recipe-category">{Data.type}</h3>
          : null}
        <h2>Ingredientes</h2>

        <div className="ingredients">
          <lo>{IngredientList(Data.ingredients)}</lo>
          <lo>{measureList(Data.measures)}</lo>
        </div>
        <h2>Instruções</h2>
        <p data-testid="instructions">{Data.Instructions}</p>
        {
          receita === 'comidas'
            ? <iframe title="vid" data-testid="video" width="50%" src={ Data.youlink } />
            : null
        }
        <h2>Recomendadas</h2>
        <div>{RecomendList(DataRecomend !== null ? DataRecomend : null, receita)}</div>
        <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
      </>
    );
  }
  return (
    <h1>Loading</h1>
  );
}

export default RecipyDetails;
