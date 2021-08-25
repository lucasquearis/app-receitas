import React from 'react';
import './style.css';

import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import BottomMenu from '../../Components/Footer/BottomMenu';
import Btn from '../../Components/Btn';

import fetchApi from '../../Helpers/fetchApi';

function ExploreDrinksOrFoods() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const currentRoute = pathname.includes('comidas') === true ? 'comidas' : 'bebidas';
  const url = currentRoute === 'comidas' ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const randomRecipe = async () => {
    const response = await fetchApi(url, 'random.php');
    return (
      currentRoute === 'comidas' ? response.meals[0].idMeal : response.drinks[0].idDrink
    );
  };

  return (
    <div className="page-explore-drinks-or-foods">
      <Header title="Explorar" />
      <div className="explore-buttons">
        <Btn
          name="Por Ingredientes"
          data-testid="explore-by-ingredient"
          variant="contained"
          onClick={ () => history.push(`/explorar/${currentRoute}/ingredientes`) }
        />
        { currentRoute === 'comidas'
          && <Btn
            name="Por Local de Origem"
            data-testid="explore-by-area"
            variant="contained"
            onClick={ () => history.push(`/explorar/${currentRoute}/area`) }
          />}
        <Btn
          name="Me Surpreenda!"
          data-testid="explore-surprise"
          variant="contained"
          onClick={ async () => {
            const id = await randomRecipe();
            history.push(`/${currentRoute}/${id}`);
          } }
        />
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreDrinksOrFoods;
