import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchFoodById } from '../services/mealAPI';
import { fetchCocktails } from '../services/cocktailAPI';
import '../styles/Details.css';
import shareImage from '../images/shareIcon.svg';
import Carousel from '../components/Carousel';
import { getFavorites, handleButton, handleShare, handleFavoriteAuxiliar }
  from '../auxiliar/auxiliarFunctions';

const youtubeEmbed = 'https://www.youtube.com/embed/';
function FoodDetails({ match: { params: { id } } }) {
  const history = useHistory();
  const isFavorite = getFavorites(id);
  const [foodInfo, setFoodInfo] = useState([]);
  const [recDrink, setRecDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(isFavorite);

  useEffect(() => {
    fetchFoodById(id).then(({ meals }) => {
      const MAX_INGREDIENT = 20;
      meals.forEach((item) => {
        let arr = [];
        for (let i = 1; i <= MAX_INGREDIENT; i += 1) {
          const itemIngredient = `strIngredient${i}`;
          const itemMeasure = `strMeasure${i}`;
          if (item[itemIngredient].length === 0) {
            setIngredients([...arr]);
            break;
          }
          arr = [
            ...arr,
            { strMeasure: item[itemMeasure], strIngredient: item[itemIngredient] },
          ];
        }
      });
      setFoodInfo(meals);
    });
    fetchCocktails().then(({ drinks }) => setRecDrinks(drinks));
  }, [id]);

  if (foodInfo.length === 0) {
    return <h1>Loading...</h1>;
  }

  const handleFavorite = () => {
    const objSave = foodInfo.map((item) => {
      const obj = {
        id: item.idMeal,
        type: 'comida',
        area: item.strArea,
        category: item.strCategory,
        alcoholicOrNot: '',
        name: item.strMeal,
        image: item.strMealThumb,
      };
      return obj;
    })[0];
    handleFavoriteAuxiliar(objSave, setIcon, icon);
  };
  return (
    <div>
      { foodInfo.map((item) => {
        const all = (
          <div key={ item.idMeal }>
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="recipe-photo"
              width="250px"
            />
            <h1 data-testid="recipe-title">{ item.strMeal }</h1>
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
            <h2 data-testid="recipe-category">{ item.strCategory }</h2>
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
            <iframe
              data-testid="video"
              width="420"
              height="315"
              title="recipe"
              src={ `${youtubeEmbed}${item.strYoutube.split('?v=')[1]}` }
            />
            <Carousel recommendation={ recDrink } />
            { handleButton(history) }
          </div>
        );
        return all;
      }) }
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodDetails;
