import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import {
  getDataFromLocalStorage,
} from '../helpers/saveOnLocalStorage';

export default function useLocalStorageRecipes() {
  const { id } = useParams();
  const location = useLocation();
  const currentPage = location.pathname;

  const [doneRecipes, setDoneRecipes] = useState(false);
  const [progress, setProgress] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);

  useEffect(() => {
    const doneRecipe = getDataFromLocalStorage('doneRecipes');
    doneRecipe.forEach((recipe) => {
      if (recipe.id === id) setDoneRecipes(true);
    });

    if (currentPage.includes('comidas')) {
      const { meals } = getDataFromLocalStorage('inProgressRecipes');
      if (meals && Object.keys(meals).includes(id)) {
        setProgress(true);
        setInProgressRecipes(meals[id]);
      }
    }
    const { cocktails } = getDataFromLocalStorage('inProgressRecipes');
    if (cocktails && Object.keys(cocktails).includes(id)) {
      setProgress(true);
      setInProgressRecipes(cocktails[id]);
    }
  }, [id, currentPage]);

  return { doneRecipes, progress, inProgressRecipes };
}
