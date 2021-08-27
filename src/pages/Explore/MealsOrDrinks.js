import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchApi, RANDOM_MEAL, RANDOM_DRINK } from '../../services';

function MealsOrDrinks() {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const recipeType = (pathname.includes('/comidas')) ? 'comidas' : 'bebidas';
  const upperCaseRecipeType = (pathname.includes('/comidas')) ? 'Meal' : 'Drink';
  const enRecipeType = (pathname.includes('/comidas')) ? 'meals' : 'drinks';

  const areaButton = (
    <Link to="/explorar/comidas/area">
      <button data-testid="explore-by-area" type="button">
        Por Local de Origem
      </button>
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
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      { (pathname.includes('/explorar/comidas')) && areaButton }
      <button
        data-testid="explore-surprise"
        onClick={ handleSuprise }
        type="button"
      >
        Me Surpreenda!
      </button>
    </>
  );

  return (
    <div>
      { (pathname === '/explorar/comidas' || pathname === '/explorar/bebidas')
        && mainContent }
    </div>
  );
}

export default MealsOrDrinks;
