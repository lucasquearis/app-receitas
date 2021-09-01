import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchFoods } from '../services/mealAPI';
import { fetchDrinkById } from '../services/cocktailAPI';
import '../styles/Details.css';
import shareImage from '../images/shareIcon.svg';
import Carousel from '../components/Carousel';
import { getFavorites, handleButton, handleShare, handleFavoriteAuxiliar }
  from '../auxiliar/auxiliarFunctions';

function DrinkDetails({ history, match: { params: { id } } }) {
  const isFavorite = getFavorites(id);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recMeal, setRecMeal] = useState([]);
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(isFavorite);

  useEffect(() => {
    fetchDrinkById(id).then(({ drinks }) => {
      const MAX_INGREDIENT = 20;
      drinks.forEach((item) => {
        let arr = [];
        for (let i = 1; i <= MAX_INGREDIENT; i += 1) {
          const itemIngredient = `strIngredient${i}`;
          const itemMeasure = `strMeasure${i}`;
          if (item[itemIngredient] === null) {
            setIngredients([...arr]);
            break;
          }
          arr = [
            ...arr,
            { strMeasure: item[itemMeasure], strIngredient: item[itemIngredient] },
          ];
        }
      });
      setDrinkDetails(drinks);
    });
    fetchFoods().then(({ meals }) => setRecMeal(meals));
  }, [id]);

  if (!drinkDetails.length) {
    return <h1>Loading...</h1>;
  }

  const handleFavorite = () => {
    const objSave = drinkDetails.map((item) => {
      const obj = {
        id: item.idDrink,
        type: 'bebida',
        area: '',
        category: item.strCategory,
        alcoholicOrNot: item.strAlcoholic,
        name: item.strDrink,
        image: item.strDrinkThumb,
      };
      return obj;
    })[0];
    handleFavoriteAuxiliar(objSave, setIcon, icon);
  };
  return (
    <div>
      { drinkDetails.map((item) => {
        const all = (
          <div key={ item.idDrink }>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid="recipe-photo"
              width="250px"
            />
            <h1 data-testid="recipe-title">{ item.strDrink }</h1>
            <input
              type="image"
              alt="share"
              src={ shareImage }
              data-testid="share-btn"
              onClick={ () => handleShare(setLink) }
            />
            <p>{ link }</p>
            <input
              type="image"
              alt="fav"
              src={ icon }
              data-testid="favorite-btn"
              onClick={ handleFavorite }
            />
            <h2 data-testid="recipe-category">{ item.strAlcoholic }</h2>
            <div>
              { ingredients.map(({ strMeasure, strIngredient }, i) => {
                const ingrID = `${i}-ingredient-name-and-measure`;
                const allIngredients = (
                  <p data-testid={ ingrID } key={ ingrID }>
                    { `${strMeasure} ${strIngredient}` }
                  </p>
                );
                return allIngredients;
              }) }
            </div>
            <p data-testid="instructions">{ item.strInstructions }</p>
            <Carousel recommendation={ recMeal } />
            { handleButton(history) }
          </div>
        );
        return all;
      }) }
    </div>
  );
}
DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
export default DrinkDetails;
