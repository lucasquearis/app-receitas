import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import MealCard from './MealCard';
import { useFetchApiMeals } from '../customHooks/useFetchApi';

export default function MealsCard() {
  const { dataMeals, searchDataMeals } = useContext(Context);
  const [getMealsApi] = useFetchApiMeals();
  const DOZE = 12;
  const UM = 1;

  useEffect(() => { getMealsApi(); }, []);

  // useEffect(() => {
  //   const data = dataMeals;
  //   if (searchDataMeals.length > UM) {
  //     return data = searchDataMeals;
  //   }
  // }, [searchDataMeals]);

  // if (!dataMeals || !searchDataMeals) {
  //   return <p>loading...</p>;
  //   if
  // }

  if (searchDataMeals.length === UM) {
    return <Redirect to={ `/comidas/${searchDataMeals[0].idMeal}` } />;
  }

  return (
    <ul>
      { dataMeals ? (
        dataMeals
          .filter((_item, index) => index < DOZE)
          .map((meal, index) => (
            <MealCard
              key={ meal.idMeal }
              meal={ meal }
              index={ index }
            />
          ))
      ) : null }
    </ul>
  );
}
