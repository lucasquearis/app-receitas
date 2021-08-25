import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, FooterMenu } from '../components';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';
import { fetchAPI } from '../services';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const { location: { pathname } } = useHistory();
  /* Source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript */
  const title = () => {
    const string = pathname.slice(1);
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const { recipeList, setRecipeList } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setRecipeList(await fetchAPI(pathname));
      setLoading(false);
    })();
  }, [setRecipeList, pathname]);

  useEffect(() => {
    setLoading(true);
  }, [pathname]);

  const TWELVE = 12;

  if (loading) return <h1>Carregando...</h1>;

  return (
    <div>
      <Header title={ title() } showSearchIcon />
      { recipeList
      && recipeList.slice(0, TWELVE)
        .map((recipe, index) => (
          <RecipeCard
            key={ recipe.idMeal || recipe.idDrink }
            name={ recipe.strMeal || recipe.strDrink }
            img={ recipe.strMealThumb || recipe.strDrinkThumb }
            index={ index }
            aux={ recipe.strCategory || recipe.strAlcoholic }
            testId="recipe-card"
          />
        )) }
      <FooterMenu key={ pathname } />
    </div>
  );
}
