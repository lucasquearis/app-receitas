import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import myContext from '../context/myContext';
import { fetchFoods } from '../redux/actions/mainActions';
import ItemCard from './ItemCard';

function FoodsCard() {
  const doze = 12;
  const { meals } = useSelector((state) => state.recipes.foods);
  const { displayFood } = useContext(myContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);
  return (
    <div className="food-cards">
      {
        displayFood.length === 0 && meals && meals.map((meal, index) => index < doze && (
          <ItemCard
            title={ meal.strMeal }
            data-testid={ `${index}-recipe-card` }
            thumb={ meal.strMealThumb }
            id={ meal.idMeal }
            index={ index }
            key={ index }
            to={ `/comidas/${meal.idMeal}` }
          />
        ))
      }
    </div>
  );
}

export default FoodsCard;
