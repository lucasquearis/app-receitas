import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { HeaderDetails, Ingredients, IniciarButton, Instructions, RecipeCard, Video } from '../components';
import { fetchAPI, fetchAPIDetails } from '../services';
import fetchAPIDetailsFood from '../services/fetchAPIDetailsFood';
import fetchAPIDetailsDrink from '../services/fetchAPIDetailsDrink';
import '../styles/receitasDetalhesPage.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function ReceitasDetailsPage() {
  const [loading, setLoading] = useState(true);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const pathnameAPI = pathname.replace(`/${id}`, '');
  const index = 0;
  const SIX = 6;
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);
  const { recipeList, setRecipeList } = useContext(AppContext);
  

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
    
    // if (pathnameAPI === '/bebidas') {
    //   (async () => {        
    //     const drinks = await fetchAPIDetailsDrink(id);
    //     setRecipeDetails(drinks);
    //     const recomendationMeals = await fetchAPI('/comidas');
    //     setRecipeList(recomendationMeals);
    //     setLoading(false);
    //     setShowVideo(false);
    //   })();     
    // }
    // return () => {
    //   setLoading(true);
    // }

    const mockDoneRecipes = [{
      id: 11007,
      type: 'comida',
    },
    {
      id: 11009,
      type: 'comida',
    }
  ];
    const mockStorage = JSON.stringify(mockDoneRecipes);
    localStorage.setItem('doneRecipes', mockStorage);  

    const checkDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));    
    const getIds = checkDoneRecipe.map((checkedId) => checkedId.id);
    const doneId = getIds.some((storageId) => id === storageId);
    console.log(getIds, 'getIds');
    if (doneId) {
      setShowButton(false);      
    }

    
  }, [setRecipeDetails, setRecipeList, id, pathnameAPI]);

  if (loading) return <h1>Carregando...</h1>;
  return (
    <div>
      <HeaderDetails
        name={ recipeDetails && (recipeDetails.strMeal || recipeDetails.strDrink) }        
        img={ recipeDetails && (recipeDetails.strMealThumb || recipeDetails.strDrinkThumb) }
        aux={ recipeDetails && (pathnameAPI !== '/comidas' ? recipeDetails.strAlcoholic : recipeDetails.strCategory) }
        area={ recipeDetails && (recipeDetails.strArea) }
        categoryDrink={ recipeDetails && (recipeDetails.strCategory) }
        alcoholic={ recipeDetails && (recipeDetails.strAlcoholic) }
      />
      <Ingredients ingredients={ recipeDetails } index={ index } />
      <Instructions instructions={ recipeDetails && (recipeDetails.strInstructions) } />
      {showVideo && (
        <Video
          video={ recipeDetails && recipeDetails.strYoutube }
        />
      )}
      {/* <Carousel itemsToShow={ 2 } showArrows={ true} outerSpacing={-10}> */}
        {/* <Carousel responsive={responsive}> */}
        <AliceCarousel responsive={2} items=
        { recipeList && recipeList.slice(0, SIX).map((recipe, index) => (
          <RecipeCard
            key={ recipe.idMeal || recipe.idDrink }
            name={ recipe.strMeal || recipe.strDrink }
            img={ recipe.strMealThumb || recipe.strDrinkThumb }
            index={ index }
            aux={ pathnameAPI !== '/comidas' ? recipe.strAlcoholic : recipe.strCategory }
            testId="recomendation-title"
          />
        ))}
        />
        {/* </Carousel> */}
      {/* </Carousel> */}
      {showButton && (
        <IniciarButton />
      )}
    </div>
  );
}
