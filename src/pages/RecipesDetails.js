// Vitals
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
// API
import { getMealsById } from '../services/mealAPI';
import { getDrinksById } from '../services/drinkAPI';
// Components
import Sugestions from '../components/Sugestions';
import HeaderDetails from '../components/HeaderDetails';
import Ingredients from '../components/Ingredients';
import Video from '../components/Video';
// Styles
import '../styles/Details.css';
import Intructions from '../components/Intructions';
import StartButton from '../components/StartButton';

function RecipesDetails() {
  const { pathname } = useLocation();
  const [, type, id] = pathname.split('/');
  const { keyType, setKeysType, recipe, setRecipe } = useContext(myContext);
  const text = keyType === 'meals' ? 'drinks' : 'meals';
  const loadingVideo = type === 'comidas' && recipe.strYoutube;

  useEffect(() => {
    const getId = async () => {
      const opt = (type === 'comidas') ? 'meals' : 'drinks';
      const result = (type === 'comidas')
        ? await getMealsById(id) : await getDrinksById(id);
      setRecipe(result[opt][0]);
      setKeysType(opt);
    };
    getId();
  }, [type, id, setKeysType, setRecipe]);

  if (!recipe) return <p>Loading....</p>;
  return (
    <section className="details-body">
      <HeaderDetails recipe={ recipe } keyType={ keyType } />
      <Ingredients recipe={ recipe } />
      <Intructions recipe={ recipe } />
      {loadingVideo && <Video url={ recipe.strYoutube } title={ recipe.strMeal } />}
      <div className="sugestions">
        <Sugestions type={ text } />
      </div>
      <StartButton />
    </section>
  );
}

export default RecipesDetails;
