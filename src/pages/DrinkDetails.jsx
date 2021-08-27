import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function DrinkDetails(props) {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const { match: { params: { id } } } = props;
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchDetails = async () => {
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setDrinkDetails(drinks);
      setIsLoading(false);
    };
    fetchDetails();
  }, []);

  function renderDetails() {
    const details = drinkDetails[0];
    const allKeys = (Object.keys(details));
    const ingredientKeys = allKeys.filter((key) => key.includes('strIngredient'));
    const validIngredientKeys = ingredientKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );
    const measuresKeys = allKeys.filter((key) => key.includes('strMeasure'));
    const validMeasuresKeys = measuresKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );
    return (
      <main>
        <img
          data-testid="recipe-photo"
          alt="imagem da receita"
          src={ details.strDrinkThumb }
        />
        <h1 data-testid="recipe-title">{ details.strDrink }</h1>
        <button type="button" data-testid="share-btn">SHARE</button>
        <button type="button" data-testid="favorite-btn">FAVORITAR</button>
        <p data-testid="recipe-category">{ details.strAlcoholic }</p>
        {
          validIngredientKeys.map((key, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ key }
            >
              { details[key] }
              :
              {
                !details[validMeasuresKeys[index]]
                  ? 'à gosto' : details[validMeasuresKeys[index]]
              }
            </p>
          ))
        }
        <p data-testid="instructions">{ details.strInstructions }</p>
        <div data-testid={ `${0}-recomendation-card` }>CARD</div>
        <button type="button" data-testid="start-recipe-btn">INICIAR RECEITA</button>
      </main>
    );
  }
  return (
    isLoading ? <p>Loading...</p> : renderDetails()
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
