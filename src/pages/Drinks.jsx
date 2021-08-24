import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestDrinks } from '../redux/actions/recipesActions';
import DefaultHeader from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(requestDrinks());
  }, [dispatch]);

  return (
    <section>
      <DefaultHeader pageTitle="Bebidas" />
      {drinks.map((drink, index) => (
        <RecipeCard
          index={ index }
          key={ drink.idDrink }
          title={ drink.strDrink }
          thumb={ drink.strDrinkThumb }
        />
      ))}
    </section>
  );
}
