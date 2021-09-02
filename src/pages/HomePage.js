import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Header, FooterMenu, RecipeCard, FiltersMenu } from '../components';
import AppContext from '../context/AppContext';
import { fetchAPI, fetchAPICategories } from '../services';
import '../styles/homePage.css';
import Loading from '../components/Loading';

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
  const {
    recipeList,
    setRecipeList, setCategoriesList, from, setFrom,
  } = useContext(AppContext);

  useEffect(() => {
    if (!from && (pathname === '/comidas' || pathname === '/bebidas')) {
      (async () => {
        setRecipeList(await fetchAPI(pathname));
        setCategoriesList(await fetchAPICategories(pathname));
        setLoading(false);
      })();
    }
    setLoading(false);
    return () => setFrom(false);
  }, [setRecipeList, setCategoriesList, pathname, setFrom, from]);

  useEffect(() => {
    (async () => setCategoriesList(await fetchAPICategories(pathname)))();
  }, [pathname, setCategoriesList]);

  useEffect(() => {
    if (idDetails) {
      setRedirectToDetails(true);
    }
  }, [idDetails]);

  const TWELVE = 12;

  if (loading) return <Loading />;

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
