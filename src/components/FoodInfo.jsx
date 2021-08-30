import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { fetchDrinksRedux, fetchMealDetails } from '../redux/actions/foodActions';
import { copyToClipboard, myFavoriteRecipe, getDate, startRecipe } from '../services';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Btn from './Btn';
import DrinksCards from './DrinksCard';
import IconBtn from './IconBtn';

function FoodInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, drinks } = useSelector((state) => state.foodsAndDrinks);
  const [favorite, setFavorite] = useState(false);
  const [button, setButton] = useState('Iniciar Receita');
  const [share, setShare] = useState(false);
  const sixRecomendations = 6;

  const getFoodAndDrinks = useCallback(() => {
    dispatch(fetchMealDetails(id));
    dispatch(fetchDrinksRedux);
  }, [dispatch, id]);

  useEffect(() => {
    getFoodAndDrinks();
  }, [getFoodAndDrinks]);

  const checkRecipeName = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage && details) {
      const storageRecipeName = storage.find(({ name }) => (
        name === details.meals[0].strMeal));
      if (storageRecipeName) {
        setButton('Continuar Receita');
      }
    } else {
      setButton('Iniciar Receita');
    }
    if (favRecipe && details) {
      const favName = favRecipe.some((item) => (
        item.name === details.meals[0].strMeal));
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

  const foodDetails = details.meals[0];
  const objKeyFood = Object.keys(foodDetails);
  const filterObjFood = objKeyFood.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjFood = filterObjFood.filter((obj) => foodDetails[obj] !== '');

  const doneRecipes = {
    id,
    type: 'comida',
    area: foodDetails.strArea,
    category: foodDetails.strCategory,
    alcoholicOrNot: '',
    name: foodDetails.strMeal,
    image: foodDetails.strMealThumb,
    doneDate: getDate(new Date()),
    tags: [foodDetails.strTags],
  };

  const favoriteRecipes = {
    id,
    type: 'comida',
    area: foodDetails.strArea,
    category: foodDetails.strCategory,
    alcoholicOrNot: '',
    name: foodDetails.strMeal,
    image: foodDetails.strMealThumb,
  };

  // const inProgressRecipes = {
  //   meals: {
  //     id: [otherFilterObjFood.map((meal) => foodDetails[meal])],
  //   },
  // };

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
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ foodDetails.strMeal }</h2>

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

      <p data-testid="recipe-category">{ foodDetails.strCategory }</p>

      <ul>
        { otherFilterObjFood.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { foodDetails[ingredient] }
          </li>)) }
      </ul>

      <p data-testid="instructions">{ foodDetails.strInstructions }</p>

      <iframe
        data-testid="video"
        width="50%"
        src={ foodDetails.strYoutube.replace('watch?v=', 'embed/') }
        title={ foodDetails.strMeal }
        allowFullScreen
      />

      <ul>
        <Carousel
          infinite
          responsive={ responsive }
        >
          { drinks.slice(0, sixRecomendations)
            .map((drink, index) => (
              <li
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                { DrinksCards(drink, 'bebidas', index) }
              </li>)) }
        </Carousel>
      </ul>

      <Link to={ `/comidas/${id}/in-progress` }>
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

export default FoodInfo;
