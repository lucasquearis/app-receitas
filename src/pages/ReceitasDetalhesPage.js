import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { CarouselContainer, HeaderIngredientsInstructions, DetailsButton, Video }
  from '../components';
import { fetchAPI, fetchAPIDetailsFood, fetchAPIDetailsDrink } from '../services';
import '../styles/receitasDetalhesPage.css';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function ReceitasDetailsPage() {
  const [loading, setLoading] = useState(true);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const pathnameAPI = pathname.replace(`/${id}`, '');
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);
  const { setRecipeList } = useContext(AppContext);

  useEffect(() => {
    if (pathnameAPI === '/comidas') {
      (async () => {
        const foods = await fetchAPIDetailsFood(id);
        setRecipeDetails(foods);
        setRecipeList(await fetchAPI('/bebidas'));
        setLoading(false);
      })();
      setShowVideo(true);
    } else {
      (async () => {
        const drinks = await fetchAPIDetailsDrink(id);
        setRecipeDetails(drinks);
        const recomendationMeals = await fetchAPI('/comidas');
        setRecipeList(recomendationMeals);
        setLoading(false);
        setShowVideo(false);
      })();
    }

    const checkDoneRecipe = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    const getIds = checkDoneRecipe.map((checkedId) => checkedId.id);
    const doneId = getIds.some((storageId) => id === storageId);

    if (doneId) {
      setShowButton(false);
    }
  }, [setRecipeDetails, setRecipeList, id, pathnameAPI]);

  if (loading) return <h1>Carregando...</h1>;
  return (
    <div>
      <HeaderIngredientsInstructions />
      {showVideo && (
        <Video
          video={ recipeDetails && recipeDetails.strYoutube }
        />
      )}
      <CarouselContainer pathnameAPI={ pathnameAPI } />

      {showButton && (
        <DetailsButton />
      )}
    </div>
  );
}
