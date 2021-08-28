import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { fetchDrinkDetails, fetchFoodRedux } from '../redux/actions/foodActions';
import { copyToClipboard, getDate, myFavoriteRecipe, startRecipe } from '../services';
import FoodsCards from './FoodsCard';
import IconBtn from './IconBtn';
import Btn from './Btn';

function DrinkInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, meals } = useSelector((state) => state.foodsAndDrinks);
  const [share, setShare] = useState(false);
  const [button, setButton] = useState('Iniciar Receita');
  const [favorite, setFavorite] = useState(false);
  const sixRecomendations = 6;

  const getFoodAndDrinks = useCallback(() => {
    dispatch(fetchFoodRedux);
    dispatch(fetchDrinkDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    getFoodAndDrinks();
  }, [getFoodAndDrinks]);

  const checkRecipeName = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage && details) {
      const storageRecipeName = storage.find(({ name }) => (
        name === details.drinks[0].strDrink));
      if (storageRecipeName) {
        setButton('Continuar Receita');
      }
    } else {
      setButton('Iniciar Receita');
    }
  }, [details]);

  useEffect(() => {
    checkRecipeName();
  }, [checkRecipeName]);

  if (!details) {
    return (
      <h1>Loading</h1>
    );
  }

  const drinkDetails = details.drinks[0];
  const objKeyDrink = Object.keys(drinkDetails);
  const filterObjDrink = objKeyDrink.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjDrink = filterObjDrink.filter((obj) => drinkDetails[obj] !== null);

  const favoriteRecipes = [{
    id,
    type: 'bebida',
    area: drinkDetails.strArea,
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strMeal,
    image: drinkDetails.strMealThumb,
  }];

  const doneRecipes = {
    id,
    type: 'bebida',
    area: '',
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strDrink,
    image: drinkDetails.strDrinkThumb,
    doneDate: getDate(new Date()),
    tags: [drinkDetails.strTags],
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 424, min: 0 },
      items: 2,
    },
  };

  return (
    <section>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ drinkDetails.strDrink }</h2>
      <p>{ drinkDetails.strAlcoholic }</p>

      <IconBtn
        dataId="share-btn"
        onClick={ () => setShare(copyToClipboard) }
        type="button"
        src="/images/shareIcon.svg"
        alt="shareIt"
      />
      { share && <span>Link copiado!</span> }

      <IconBtn
        type="button"
        dataId="favorite-btn"
        onClick={ () => setFavorite(myFavoriteRecipe(favoriteRecipes)) }
        src={ favorite ? '/images/blackHeartIcon.svg' : '/images/whiteHeartIcon.svg' }
        alt="favorite heart"
      />

      <p data-testid="recipe-category">{ drinkDetails.strCategory }</p>

      <ul>
        { otherFilterObjDrink.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { drinkDetails[ingredient] }
          </li>)) }
      </ul>

      <p data-testid="instructions">{ drinkDetails.strInstructions }</p>

      <ul>
        <Carousel
          infinite
          responsive={ responsive }
          data-testid="0-recomendation-card"
        >
          { meals.slice(0, sixRecomendations)
            .map((drink, index) => (
              <li
                key={ index }
                data-testid={ `${0}-recomendation-card` }
              >
                { FoodsCards(drink, 'bebidas', index) }
              </li>)) }
        </Carousel>
      </ul>

      <Link to={ `/bebidas/${id}/in-progress` }>
        <Btn
          dataId="start-recipe-btn"
          onClick={ () => startRecipe(doneRecipes) }
          info={ button }
          className="btn-fixed"
        />
      </Link>

    </section>
  );
}

export default DrinkInfo;
