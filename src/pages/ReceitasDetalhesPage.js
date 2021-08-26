import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { useHistory, useParams } from 'react-router-dom';
import { HeaderDetails } from '../components';
import { Ingredients } from '../components';
import { IniciarButton } from '../components';
import { Instructions } from '../components';
import { RecipeCard } from '../components';
import { Video } from '../components';
import fetchAPIDetails from '../services/fetchAPIDetails';
import { fetchAPI } from '../services';
import '../styles/receitasDetalhesPage.css';

export default function ReceitasDetailsPage() {  
  const [loading, setLoading] = useState(true);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();  
  const pathnameAPI = pathname.slice(0,8);  
  const index = 0;  
  const SIX = 6;  
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(true);
   

  const { recipeDetails, setRecipeDetails } = useContext(AppContext);  
  const { recipeList, setRecipeList } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setRecipeDetails(await fetchAPIDetails(pathnameAPI, id));      
      setLoading(false);      
    })();
    if (pathnameAPI === "/comidas"){
      (async () => {
        setRecipeList(await fetchAPI("/bebidas"));   
       
      })();      
      return setShowVideo(true);
    } else if (pathnameAPI ==="/bebidas"){
      (async () => {
        setRecipeList(await fetchAPI("/comidas"));  
      })();
    }

    const mock = {
      id:11007,
    };
    const mockStorage = JSON.stringify(mock);
    localStorage.setItem('doneRecipes', mockStorage);
    

    const checkDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (checkDoneRecipe.id === id){
      setShowButton(false);

    }
  }, [setRecipeDetails, pathnameAPI]);

  if (loading) return <h1>Carregando...</h1>;
  return (
    <div>      
      <HeaderDetails 
      name={ recipeDetails.strMeal || recipeDetails.strDrink }    
      img={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }         
      aux={ pathnameAPI !== "/comidas" ? recipeDetails.strAlcoholic : recipeDetails.strCategory } />
      <Ingredients ingredients={recipeDetails} index={index} />
      <Instructions instructions={recipeDetails.strInstructions} />
      {showVideo && (
      <Video 
      video={ recipeDetails.strYoutube }/>
      )}
      {/* <RecipeCards recipeList={recipeList}/> */}
      

      { recipeList && recipeList.slice(0, SIX).map((recipe, index) => (
        <RecipeCard 
        key={recipe.idMeal ||recipe.idDrink }
        name={ recipe.strMeal || recipe.strDrink }
        img={ recipe.strMealThumb || recipe.strDrinkThumb }
        index={ index }
        aux={ pathnameAPI !== "/comidas" ? recipe.strAlcoholic : recipe.strCategory }
        testId="recomendation-card"
      />
      ))}       
         
      {showButton && (
      <IniciarButton />
      )}     
    </div>
  );
}
