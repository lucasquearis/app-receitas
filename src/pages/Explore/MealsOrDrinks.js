import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchApi, RANDOM_MEAL, RANDOM_DRINK } from '../../services';

import Button from '../../style/elements/Button';

function MealsOrDrinks() {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const recipeType = (pathname.includes('/comidas')) ? 'comidas' : 'bebidas';
  const upperCaseRecipeType = (pathname.includes('/comidas')) ? 'Meal' : 'Drink';
  const enRecipeType = (pathname.includes('/comidas')) ? 'meals' : 'drinks';

  const areaButton = (
    <Link to="/explorar/comidas/area">
      <Button
        data-testid="explore-by-area"
        type="button"
        bgColor="#34C95E"
        shadowColor="#2CA64E"
      >
        Por Local de Origem
      </Button>
    </Link>
  );

  const handleSuprise = async () => {
    const randomRecipe = await fetchApi(
      (pathname.includes('comidas')) ? RANDOM_MEAL : RANDOM_DRINK,
    );

    push(`/${recipeType}/${randomRecipe[enRecipeType][0][`id${upperCaseRecipeType}`]}`);
  };

  const mainContent = (
    <>
      <Link
        to={ `/explorar/${recipeType}/ingredientes` }
      >
        <Button
          data-testid="explore-by-ingredient"
          type="button"
          bgColor="#34C95E"
          shadowColor="#2CA64E"
        >
          Por Ingredientes
        </Button>
      </Link>
      { (pathname.includes('/explorar/comidas')) && areaButton }
      <Button
        data-testid="explore-surprise"
        onClick={ handleSuprise }
        type="button"
        bgColor="#34C95E"
        shadowColor="#2CA64E"
      >
        Me Surpreenda!
      </Button>
    </>
  );

  return (
    <>
      { (pathname === '/explorar/comidas' || pathname === '/explorar/bebidas')
        && mainContent }
      { null }
    </>
  );
}

export default MealsOrDrinks;
