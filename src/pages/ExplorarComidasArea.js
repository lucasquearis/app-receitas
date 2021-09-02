import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Header, FooterMenu, RecipeCard, AreaSelect } from '../components';
import AppContext from '../context/AppContext';
import { fetchAPI } from '../services';
import Loading from '../components/Loading';

export default function ExplorarComidasArea() {
  const [loading, setLoading] = useState(true);
  const [idDetails, setIdDetails] = useState(null);
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  const { location: { pathname } } = useHistory();

  const { recipeList, setRecipeList, setCategoriesList } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setRecipeList(await fetchAPI('/comidas'));
      setLoading(false);
    })();
  }, [setRecipeList, setCategoriesList, pathname]);

  useEffect(() => {
    if (idDetails) {
      setRedirectToDetails(true);
    }
  }, [idDetails]);

  const TWELVE = 12;

  if (loading) return <Loading />;

  if (redirectToDetails) {
    return <Redirect to={ `/comidas/${idDetails}` } />;
  }

  return (
    <div>
      <Header title="Explorar Origem" showSearchIcon />
      <main className="main-bkc explorar-area-page">
        <AreaSelect />
        { recipeList
        && recipeList.slice(0, TWELVE)
          .map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              id={ recipe.idMeal || recipe.idDrink }
              name={ recipe.strMeal || recipe.strDrink }
              img={ recipe.strMealThumb || recipe.strDrinkThumb }
              index={ index }
              testId="recipe-card"
              setIdDetails={ setIdDetails }
            />
          )) }
      </main>
      <FooterMenu />
    </div>
  );
}
