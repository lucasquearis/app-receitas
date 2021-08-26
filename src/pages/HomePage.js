import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Header, FooterMenu, RecipeCard, FiltersMenu } from '../components';
import AppContext from '../context/AppContext';
import { fetchAPI, fetchAPICategories } from '../services';
import '../styles/homePage.css';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [idDetails, setIdDetails] = useState(null);
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  const { location: { pathname } } = useHistory();
  /* Source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript */
  const title = () => {
    const string = pathname.slice(1);
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const { recipeList, setRecipeList, setCategoriesList } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setRecipeList(await fetchAPI(pathname));
      setCategoriesList(await fetchAPICategories(pathname));
      setLoading(false);
    })();
  }, [setRecipeList, setCategoriesList, pathname]);

  useEffect(() => {
    setLoading(true);
  }, [pathname]);

  useEffect(() => {
    if (idDetails) {
      setRedirectToDetails(true);
    }
  }, [idDetails]);

  const TWELVE = 12;

  if (loading) return <h1>Carregando...</h1>;

  if (redirectToDetails) {
    return <Redirect to={ `${pathname}/${idDetails}` } />;
  }

  return (
    <>
      <Header title={ title() } showSearchIcon />
      <FiltersMenu type={ pathname } />
      <main>
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
      <FooterMenu key={ pathname } />
    </>
  );
}
