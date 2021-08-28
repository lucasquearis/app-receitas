import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// TESTANDO O COMPONENTE QUE RECEBE SOMENTE BEBIDAS. TALVES AS KEYS DE UMA API NÃO SEJAM AS MESMAS DE OUTRA
const returnUrl = (id) => {
  // const URL_COMIDA = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URL_BEBIDA = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return URL_BEBIDA;
  // return receita === 'comidas' ? URL_COMIDA : URL_BEBIDA;
};

function TestRecipyDetails() {
  const [favoriteRender, setFavoriteRender] = useState(false);
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchEffect = async () => {
      try {
        const fetchApi = await fetch(returnUrl(id));
        const { meals } = await fetchApi.json();
        setData(meals[0]);
        console.log(meals[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEffect();
  }, [id]);

  const handleClick = () => (
    !favoriteRender
      ? setFavoriteRender(true)
      : setFavoriteRender(false)
  );

  const favoriteFalse = () => (
    <button type="button" onClick={ handleClick }>
      <img
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="white-heart"
      />
    </button>
  );

  const favoriteTrue = () => (
    <button type="button" onClick={ handleClick }>
      <img
        data-testid="favorite-btn"
        src={ blackHeartIcon }
        alt="black-heart"
      />
    </button>
  );

  return (
    <>
      <img data-testid="recipe-photo" src={ blackHeartIcon } alt="detalhes" />
      <div>
        <h1 data-testid="recipe-title">
          { data.strMeal }
        </h1>
        <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        { favoriteRender ? favoriteTrue() : favoriteFalse() }
      </div>
      <h3 data-testid="recipe-category">{ data.strCategory }</h3>
      <h2>Ingredientes</h2>
      {/* map para li */}
      <lo>
        <li data-testid="0-ingredient-name-and-measure">{ data.strIngredient1 }</li>
      </lo>
      <h2 data-testid="instructions">Instruções</h2>
      <iframe
        title="video"
        data-testid="video"
        width="50%"
        src={ data.strYoutube }
      />
      <h2>Recomendadas</h2>
      <div>
        <div data-testid="0-recomendation-card">cards recomendadas</div>
        <div data-testid="0-recomendation-card">cards recomendadas</div>
      </div>
      <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
    </>
  );
}

export default TestRecipyDetails;
