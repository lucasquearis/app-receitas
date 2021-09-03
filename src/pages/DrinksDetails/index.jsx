import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DrinkInfo from '../../components/DrinkInfo';
import IconBtn from '../../components/IconBtn';
import { fetchDrinkDetails } from '../../redux/actions/foodActions';
import { copyToClipboard } from '../../services';
import shareIcon from '../../images/shareIcon.svg';
import BtnDrinks from '../../components/BtnDrinks';
import FavoriteDrinkBtn from '../../components/FavoriteDrinkBtn';
import CarouselDrink from '../../components/CarouselDrink';
import '../../components/foodDrinks.css';
import './style.css';

function DrinksDetails() {
  const { id } = useParams();
  const { details } = useSelector((state) => state.foodsAndDrinks);
  const dispatch = useDispatch();
  const [share, setShare] = useState(false);

  const getFoodAndDrinks = useCallback(() => {
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

  return (
    <body className="details-drink">
      <DrinkInfo drinkDetails={ drinkDetails } />

      <section className="share-fav-btn">
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
      </section>

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

      <p data-testid="instructions">{ drinkDetails.strInstructions }</p>

      <CarouselDrink />

      <p className="gambi" />

      <Link to={ `/bebidas/${id}/in-progress` }>
        <BtnDrinks
          dataId="start-recipe-btn"
          className="fixed-btn"
          details={ details }
          id={ id }
        />
      </Link>

    </body>
  );
}

export default DrinksDetails;
