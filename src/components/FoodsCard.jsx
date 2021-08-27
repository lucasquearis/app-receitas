import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFoods } from '../redux/actions/mainActions';
import ItemCard from './ItemCard';

function FoodsCard() {
  const doze = 12;
  const { meals } = useSelector((state) => state.recipes.foods);
  const loading = useSelector((state) => state.recipes.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      {
        meals && meals.map((meal, index) => index < doze && (
          <ItemCard
            title={ meal.strMeal }
            data-testid={ `${index}-recipe-card` }
            thumb={ meal.strMealThumb }
            id={ meal.idMeal }
            index={ index }
            key={ index }
          />
        ))
      }
    </div>
  );
}

export default FoodsCard;
