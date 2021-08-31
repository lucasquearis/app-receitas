import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { CarouselContainer, HeaderIngredientsInstructions, DetailsButton, Video }
  from '../components';
import { fetchAPI, fetchAPIDetails } from '../services';
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
    (async () => {
      const results = await fetchAPIDetails(pathnameAPI, id);
      const result = results.meals || results.drinks;
      setRecipeDetails(result[0]);
      const recomendations = pathnameAPI === '/comidas' ? '/bebidas' : '/comidas';
      setRecipeList(await fetchAPI(recomendations));
      setLoading(false);
      if (pathnameAPI === '/comidas') setShowVideo(true);
    })();

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
