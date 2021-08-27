import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecomendations } from '../services/api';

export default function useRecomendations() {
  const [recomendations, setRecomendations] = useState([]);
  const location = useLocation();
  const currentPage = location.pathname;

  useEffect(() => {
    const getDataRecomendation = async () => {
      await getRecomendations().then((response) => setRecomendations(response));
    };
    getDataRecomendation();
  }, []);

  useEffect(() => {
    if (currentPage.includes('comidas')) {
      recomendations.map(({
        idDrink,
        strDrinkThumb,
        strAlcoholic,
        strDrink,
      }, index) => ({
        idDrink,
        strDrinkThumb,
        strAlcoholic,
        strDrink,
        index,
      }));
    } else if (currentPage.includes('bebidas')) {
      recomendations.map(({
        idMeal,
        strMealThumb,
        strMeal,
        strCategory,
      }, index) => ({
        idMeal,
        strMealThumb,
        strMeal,
        strCategory,
        index,
      }));
    }
  }, [currentPage, recomendations]);

  return {
    recomendations,
  };
}
