import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import myContext from '../context/myContext';
import { fetchDrinks } from '../redux/actions/mainActions';
import ItemCard from './ItemCard';

function DrinksCard() {
  const doze = 12;
  const drinks = useSelector((state) => state.recipes.foods.drinks);
  const { display } = useContext(myContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  return (
    <div className="food-cards">
      {
        display.length === 0 && drinks && drinks.map((drink, index) => index < doze && (
          <ItemCard
            title={ drink.strDrink }
            data-testid={ `${index}-recipe-card` }
            thumb={ drink.strDrinkThumb }
            id={ drink.idDrink }
            index={ index }
            key={ index }
            to={ `/bebidas/${drink.idDrink}` }
          />
        ))
      }
    </div>
  );
}

export default DrinksCard;
