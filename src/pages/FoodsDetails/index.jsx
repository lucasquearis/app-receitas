import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import FoodInfo from '../../components/FoodInfo';
import IconBtn from '../../components/IconBtn';
import { fetchDrinksRedux, fetchMealDetails } from '../../redux/actions/foodActions';
import { copyToClipboard } from '../../services';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteFoodBtn from '../../components/FavoriteFoodBtn';
import BtnFoods from '../../components/BtnFoods';
import DrinksCards from '../../components/DrinksCard';
import '../../components/foodDrinks.css';

function FoodsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [share, setShare] = useState(false);
  const { details, drinks } = useSelector((state) => state.foodsAndDrinks);

  const getFoodAndDrinks = useCallback(() => {
    dispatch(fetchMealDetails(id));
    dispatch(fetchDrinksRedux);
  }, [dispatch, id]);

  useEffect(() => {
    getFoodAndDrinks();
  }, [getFoodAndDrinks]);

  if (!details) {
    return (
      <h1>Loading</h1>
    );
  }

  const foodDetails = details.meals[0];
  const objKeyFood = Object.keys(foodDetails);
  const filterObjFood = objKeyFood.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjFood = filterObjFood.filter((obj) => (
    foodDetails[obj] !== ''));

  const sixRecomendations = 6;

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
      <FoodInfo foodDetails={ foodDetails } />

      <IconBtn
        dataId="share-btn"
        onClick={ () => setShare(copyToClipboard) }
        type="button"
        src={ shareIcon }
        alt="shareIt"
      />
      { share && <span>Link copiado!</span> }

      <FavoriteFoodBtn
        details={ details }
        dataId="favorite-btn"
        alt="favorite"
      />

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
                { DrinksCards(drink, 'comidas', index) }
              </li>)) }
        </Carousel>
      </ul>

      <Link to={ `/comidas/${id}/in-progress` }>
        <BtnFoods
          dataId="start-recipe-btn"
          className="fixed-btn"
          details={ details }
          id={ id }
        />
      </Link>

    </section>
  );
}

export default FoodsDetails;
