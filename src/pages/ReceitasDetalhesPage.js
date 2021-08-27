import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { HeaderDetails, Ingredients, IniciarButton, Instructions, RecipeCard, Video } from '../components';
import { fetchAPI, fetchAPIDetails } from '../services';
import '../styles/receitasDetalhesPage.css';
import Carousel from 'react-elastic-carousel'
// import "react-multi-carousel/lib/styles.css";
// import Carousel from 'react-multi-carousel';

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 2
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 2
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 2
//   }
// };

export default function ReceitasDetailsPage() {
  const [loading, setLoading] = useState(true);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const pathnameAPI = pathname.replace(`/${id}`,"");
  const index = 0;
  const SIX = 6;
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);
  const { recipeList, setRecipeList } = useContext(AppContext);
  console.log(recipeDetails);
  
  useEffect(() => {
    (async () => {
      const test = await fetchAPIDetails(pathnameAPI, id);
      
      setRecipeDetails(test);
      setLoading(false);
    })();
    // if (pathnameAPI === '/comidas') {
    //   (async () => {
    //     setRecipeList(await fetchAPI('/bebidas'));
    //   })();
    //   setShowVideo(true);
    // }
    // if (pathnameAPI === '/bebidas') {
    //   (async () => {
    //     setRecipeList(await fetchAPI('/comidas'));
    //     setShowVideo(false);
    //   })();
    // }

    // const mock = {
    //   id: 11007,
    // };
    // const mockStorage = JSON.stringify(mock);
    // localStorage.setItem('doneRecipes', mockStorage);

    // const checkDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    // if (checkDoneRecipe.id === id) {
    //   setShowButton(false);
    // }
  }, [setRecipeDetails, setRecipeList, id, pathnameAPI]);

  if (loading) return <h1>Carregando...</h1>;
  return (
    <div>
      <HeaderDetails        
        name={ recipeDetails && (recipeDetails.strMeal || recipeDetails.strDrink) }
        // name={ pathnameAPI === '/comidas' ? recipeDetails.strMeal : recipeDetails.strDrink }
        img={ recipeDetails && (recipeDetails.strMealThumb || recipeDetails.strDrinkThumb) }
        aux={ recipeDetails && (pathnameAPI !== '/comidas' ? recipeDetails.strAlcoholic : recipeDetails.strCategory) }
        area={ recipeDetails && (recipeDetails.strArea)}
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
      <Carousel itemsToShow={2} showArrows={false}>
      {/* <Carousel responsive={responsive}> */}
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
      {/* </Carousel> */}
      </Carousel> 
        {showButton && (
        <IniciarButton />
      )}
    </div>
  );
}
