import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import MealCard from './MealCard';
import { useFetchApiMeals } from '../customHooks/useFetchApi';

export default function MealsCard() {
  const { dataMeals, searchDataMeals, loading } = useContext(Context);
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

  const showAlert = (func, mensagem) => func(mensagem);
  const msgNotRecipe = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  if (searchDataMeals && searchDataMeals.length === UM) {
    return <Redirect to={ `/comidas/${searchDataMeals[0].idMeal}` } />;
  }

  const selectData = (principalMeals, searchMeals) => {
    if (searchDataMeals <= UM) {
      const data = principalMeals;
      return data;
    }
    const data = searchMeals;
    return data;
  };

  if (loading === true) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {
        (searchDataMeals === null || searchDataMeals === undefined)
        && showAlert(alert, msgNotRecipe)
      }
      {/* { if (searchDataMeals === null || searchDataMeals === undefined) {
        return showAlert(alert, msgNotRecipe);
      } } */}
      { dataMeals ? (
        selectData(dataMeals, searchDataMeals)
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
