import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestFoods } from '../redux/actions/recipesActions';
import DefaultHeader from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function Foods() {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(requestFoods());
  }, [dispatch]);

  return (
    <section>
      <DefaultHeader pageTitle="Comidas" />
      {foods.map((food, index) => (
        <RecipeCard
          key={ food.idMeal }
          title={ food.strMeal }
          thumb={ food.strMealThumb }
          index={ index }
        />
      ))}
    </section>
  );
}
