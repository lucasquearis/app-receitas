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
import FoodsCards from '../../components/FoodsCard';
import '../../components/foodDrinks.css';

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

  if (!details) {
    return (
      <h1>Loading</h1>
    );
  }
  const drinkDetails = details.drinks[0];
  const objKeyDrink = Object.keys(drinkDetails);
  const filterObjDrink = objKeyDrink.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjDrink = filterObjDrink.filter((obj) => (
    drinkDetails[obj] !== null));

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
        >
          { meals.slice(0, sixRecomendations)
            .map((food, index) => (
              <li
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                { FoodsCards(food, 'bebidas', index) }
              </li>)) }
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
