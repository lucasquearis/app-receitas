import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import DrinkCard from './DrinkCard';
import { useFetchApiDrinks } from '../customHooks/useFetchApi';

export default function DrinksCards() {
  const {
    dataDrinks,
    searchDataDrinks,
    loading,
    filterByIngredientsDrinks,
  } = useContext(Context);
  const [getDrinksApi] = useFetchApiDrinks();
  const DOZE = 12;
  const UM = 1;

  useEffect(() => { getDrinksApi(); }, []);

  const showAlert = (func, mensagem) => func(mensagem);
  const msgNotRecipe = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  if (searchDataDrinks && searchDataDrinks.length === UM) {
    return <Redirect to={ `/bebidas/${searchDataDrinks[0].idDrink}` } />;
  }

  const selectData = (principalDrinks, searchDrinks, filterIngredients) => {
    if (searchDataDrinks <= UM && !filterByIngredientsDrinks) {
      const data = principalDrinks;
      return data;
    }
    if (searchDataDrinks > UM && !filterByIngredientsDrinks) {
      const data = searchDrinks;
      return data;
    }
    if (filterByIngredientsDrinks) {
      const data = filterIngredients;
      return data;
    }
    const data = searchDrinks;
    return data;
  };

  if (loading === true) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {
        (searchDataDrinks === null || searchDataDrinks === undefined)
        && showAlert(alert, msgNotRecipe)
      }
      { dataDrinks ? (
        selectData(dataDrinks, searchDataDrinks, filterByIngredientsDrinks)
          .filter((_item, index) => index < DOZE)
          .map((drink, index) => (
            <DrinkCard
              key={ drink.idDrink }
              drink={ drink }
              index={ index }
            />
          ))
      ) : null }
    </ul>
  );
}
