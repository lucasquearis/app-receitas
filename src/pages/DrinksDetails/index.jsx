import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import DrinkInfo from '../../components/DrinkInfo';
import IconBtn from '../../components/IconBtn';
import { fetchDrinkDetails, fetchFoodRedux } from '../../redux/actions/foodActions';
import { copyToClipboard } from '../../services';
import shareIcon from '../../images/shareIcon.svg';
import BtnDrinks from '../../components/BtnDrinks';
import FavoriteDrinkBtn from '../../components/FavoriteDrinkBtn';
import '../../components/foodDrinks.css';
import 'react-multi-carousel/lib/styles.css';

function DrinksDetails() {
  const { id } = useParams();
  const { details, meals } = useSelector((state) => state.foodsAndDrinks);
  const dispatch = useDispatch();
  const [share, setShare] = useState(false);

  const getFoodAndDrinks = useCallback(() => {
    dispatch(fetchFoodRedux);
    dispatch(fetchDrinkDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    getFoodAndDrinks();
  }, [getFoodAndDrinks]);

  if (!details.drinks) {
    return (
      <h1>Loading</h1>
    );
  }
  const drinkDetails = details.drinks[0];
  const objKeyDrink = Object.keys(drinkDetails);
  const filterObjDrink = objKeyDrink
    .filter((obj) => obj
      .includes('strIngredient') && drinkDetails[obj] !== ''
      && drinkDetails[obj] !== null);
  const filterObjMeasure = objKeyDrink
    .filter((obj) => obj
      .includes('strMeasure') && drinkDetails[obj] !== ' ' && drinkDetails[obj] !== null);
  const ingredientesWithMeasures = filterObjDrink
    .map((e, index) => `${drinkDetails[e]} - ${drinkDetails[filterObjMeasure[index]]}`);

  const sixRecomendations = 6;
  const carouselMeals = [...meals.slice(0, sixRecomendations)];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  return (
    <section>
      <DrinkInfo drinkDetails={ drinkDetails } />

      <IconBtn
        dataId="share-btn"
        onClick={ () => setShare(copyToClipboard) }
        type="button"
        src={ shareIcon }
        alt="shareIt"
      />
      { share && <span>Link copiado!</span> }

      <FavoriteDrinkBtn
        details={ details }
        dataId="favorite-btn"
        alt="favorite"
      />

      <p data-testid="recipe-category">{ drinkDetails.strAlcoholic }</p>

      <ul>
        { ingredientesWithMeasures.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { ingredient }
          </li>)) }
      </ul>

      <p data-testid="instructions">{ drinkDetails.strInstructions }</p>

      <ul>
        <Carousel
          swipeable={ false }
          draggable={ false }
          showDots
          responsive={ responsive }
          autoPlaySpeed={ 1000 }
          keyBoardControl
          customTransition="all .5"
          transitionDuration={ 500 }
          containerClass="carousel-container"
          removeArrowOnDeviceType={ ['tablet', 'mobile'] }
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          { carouselMeals.map((food, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <Link to={ `/comidas/${food.idMeal}/` }>
                <img src={ food.strMealThumb } alt="meal-recomendation" />
                <p data-testid={ `${index}-recomendation-title` }>{ food.strMeal}</p>
              </Link>
            </div>)) }
        </Carousel>
      </ul>

      <Link to={ `/bebidas/${id}/in-progress` }>
        <BtnDrinks
          dataId="start-recipe-btn"
          className="fixed-btn"
          details={ details }
          id={ id }
        />
      </Link>

    </section>
  );
}

export default DrinksDetails;
