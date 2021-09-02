import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Header, FooterMenu, AreaSearchButton } from '../components';
import * as API from '../services';

export default function ExplorarRecipesPage() {
  const [explorarRedirect, setExplorar] = useState({
    ingedient: false, area: false, surprise: false });
  const { ingedient, area, surprise } = explorarRedirect;
  const [id, setID] = useState();
  const { location: { pathname } } = useHistory();
  const typeOfRecipe = pathname.match(/\/comidas|\/bebidas/)[0];

  const title = () => {
    const string = typeOfRecipe.slice(1);
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const populateID = async () => {
    const recipe = await API.fetchRandomRecipe(typeOfRecipe);
    setID(recipe.idDrink || recipe.idMeal);
  };

  const handleClick = async ({ target: { name, value } }) => {
    setExplorar({
      ...explorarRedirect,
      [name]: Boolean(value),
    });
    if (name === 'surprise') await populateID();
  };

  if (ingedient) return <Redirect to={ `/explorar${typeOfRecipe}/ingredientes` } />;
  if (area) return <Redirect to={ `/explorar${typeOfRecipe}/area` } />;
  if (surprise && id) return <Redirect to={ `${typeOfRecipe}/${id}` } />;
  return (
    <div>
      <Header title={ `Explorar ${title()}` } showSearchIcon={ false } />
      <div className="main-bkc explorar-recipes-page">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          name="ingedient"
          value="true"
          onClick={ handleClick }
        >
          Por Ingredientes
        </button>
        {typeOfRecipe === '/comidas' && <AreaSearchButton handleClick={ handleClick } /> }
        <button
          type="button"
          data-testid="explore-surprise"
          name="surprise"
          value="true"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <FooterMenu />
    </div>
  );
}
