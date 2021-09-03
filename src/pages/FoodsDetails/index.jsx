import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FoodInfo from '../../components/FoodInfo';
import IconBtn from '../../components/IconBtn';
import { fetchMealDetails } from '../../redux/actions/foodActions';
import { copyToClipboard } from '../../services';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteFoodBtn from '../../components/FavoriteFoodBtn';
import BtnFoods from '../../components/BtnFoods';
import '../../components/foodDrinks.css';
import CarouselFood from '../../components/CarouselFood';
import './style.css';

function FoodsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [share, setShare] = useState(false);
  const { details } = useSelector((state) => state.foodsAndDrinks);

  const getFoodAndDrinks = useCallback(() => {
    dispatch(fetchMealDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    getFoodAndDrinks();
  }, [getFoodAndDrinks]);

  if (!details.meals) {
    return (
      <h1>Loading</h1>
    );
  }

  const foodDetails = details.meals[0];
  const objKeyFood = Object.keys(foodDetails);
  const filterObjFood = objKeyFood
    .filter((obj) => obj
      .includes('strIngredient') && foodDetails[obj] !== '' && foodDetails[obj] !== null);
  const filterObjMeasure = objKeyFood
    .filter((obj) => obj
      .includes('strMeasure') && foodDetails[obj] !== ' ' && foodDetails[obj] !== null);
  const ingredientesWithMeasures = filterObjFood
    .map((e, index) => `${foodDetails[e]} - ${foodDetails[filterObjMeasure[index]]}`);

  return (
    <body className="details-drink">
      <FoodInfo foodDetails={ foodDetails } />

      <section className="share-fav-btn">
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
      </section>

      <p data-testid="recipe-category">{ foodDetails.strCategory }</p>

      <ul>
        { ingredientesWithMeasures.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
            className="ingredients-list"
          >
            { ingredient }
          </li>)) }
      </ul>

      <p data-testid="instructions">{ foodDetails.strInstructions }</p>

      <iframe
        className="embed-video"
        data-testid="video"
        width="50%"
        src={ foodDetails.strYoutube.replace('watch?v=', 'embed/') }
        title={ foodDetails.strMeal }
        allowFullScreen
      />

      <CarouselFood />

      <p className="gambi" />

      <Link to={ `/comidas/${id}/in-progress` }>
        <BtnFoods
          dataId="start-recipe-btn"
          className="fixed-btn"
          details={ details }
          id={ id }
        />
      </Link>

    </body>
  );
}

export default FoodsDetails;
