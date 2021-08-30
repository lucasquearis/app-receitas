import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { fetchDrinkDetails, fetchFoodRedux } from '../redux/actions/foodActions';
import { copyToClipboard, /* getDate */myFavoriteRecipe, startRecipe } from '../services';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
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
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage && details) {
      const storageRecipeName = storage.cocktails.idRecipe.find(({ name }) => (
        name === details.drinks[0].strDrink));
      if (storageRecipeName) {
        setButton('Continuar Receita');
      }
    } else {
      setButton('Iniciar Receita');
    }
    if (favRecipe && details) {
      const favName = favRecipe.some((item) => (
        item.name === details.drinks[0].strDrink));
      if (favName) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
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

  const favoriteRecipes = {
    id,
    type: 'bebida',
    area: '',
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strDrink,
    image: drinkDetails.strDrinkThumb,
  };

  // const doneRecipes = {
  //   id,
  //   type: 'bebida',
  //   area: '',
  //   category: drinkDetails.strCategory,
  //   alcoholicOrNot: drinkDetails.strAlcoholic,
  //   name: drinkDetails.strDrink,
  //   image: drinkDetails.strDrinkThumb,
  //   doneDate: getDate(new Date()),
  //   tags: [drinkDetails.strTags],
  // };

  const inProgressRecipes = {
    cocktails: {
      [id]: otherFilterObjDrink.map((drink) => drinkDetails[drink]),
    },
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
        src={ shareIcon }
        alt="shareIt"
      />
      { share && <span>Link copiado!</span> }

      <button
        type="button"
        onClick={ () => setFavorite(myFavoriteRecipe(favoriteRecipes)) }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>

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
          onClick={ () => startRecipe(inProgressRecipes) }
          info={ button }
          className="btn-fixed"
        />
      </Link>

    </section>
  );
}

export default DrinkInfo;
