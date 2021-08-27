import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { fetchDrinkById } from '../../services/fetchApi';

function DetailsDrink({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});
  const [isMount, setIsMount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDrink = () => {
    const getdrink = async () => {
      const drinkData = await fetchDrinkById(id);
      setDrink(drinkData);
      console.log(drinkData);
      setIsMount(true);
      setIsLoading(false);
    };
    if (!isMount) getdrink();
  };

  useEffect(fetchDrink);

  if (isLoading) return <div>Carregando...</div>;

  const keysDrinks = Object.keys(drink);
  const ingredientskeys = keysDrinks.filter((key) => (
    key.includes('strIngredient') && !!drink[key]));

  const allow = `accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture`;
  const videoRegex = drink.strVideo
    ? drink.strVideo.replace(/watch\?v=/, 'embed/') : null;
  console.log(videoRegex);

  // const testId = 11007; ID = testado

  return (
    <div>
      <img
        src={ drink.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
        width="150"
        height="150"
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <p data-testid="recipe-category">{drink.strCategory}</p>
      <p data-testid="recipe-alcoholic">{drink.strAlcoholic}</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <ul>
        {ingredientskeys.map((key, index) => (
          <li
            key={ key }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {drink[key]}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <section>
        <iframe
          width="560"
          height="315"
          src={ videoRegex }
          title="YouTube video player"
          frameBorder="0"
          allow={ allow }
          allowFullScreen
          data-testid="video"
        />
      </section>
      {/* <div data-testid={ `${index}-recomendation-card` }>
        receitas recomendadas
      </div> */}
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}

DetailsDrink.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default DetailsDrink;
