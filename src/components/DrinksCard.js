import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrinks } from '../redux/actions/mainActions';
import ItemCard from './ItemCard';

function DrinksCard() {
  const doze = 12;
  const drinks = useSelector((state) => state.recipes.foods.drinks);
  const loading = useSelector((state) => state.recipes.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      {
        drinks && drinks.map((drink, index) => index < doze && (
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
