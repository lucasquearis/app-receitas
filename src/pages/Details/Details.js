import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderDetails from '../../components/Details/HeaderDetails';
import Ingredients from '../../components/Details/Ingredients';
import Instructions from '../../components/Details/Instructions';
import Recommendations from '../../components/Details/Recommendations';
import StartButton from '../../components/Details/StartButton';
import Video from '../../components/Details/Video';
import { useData } from '../../Context/DataContext';
import './Details.css';

export default function Details() {
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];
  const category = pathname.split('/')[1];

  const {
    detailsData,
    setDetailsData,
    recommendationsData,
    setRecommendationsData,
  } = useData();

  useEffect(() => {
    const fetchAPI = async () => {
      let url = '';
      if (category === 'comidas') url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      if (category === 'bebidas') url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(url);
      const data = await response.json();

      if (category === 'comidas') setDetailsData(data.meals[0]);
      if (category === 'bebidas') setDetailsData(data.drinks[0]);
    };
    fetchAPI();
  }, [category, id, setDetailsData]);

  useEffect(() => {
    const fetchAPI = async () => {
      let url = '';
      if (category === 'comidas') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      if (category === 'bebidas') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const response = await fetch(url);
      const data = await response.json();

      const reps = 6;

      if (category === 'bebidas') setRecommendationsData(data.meals.slice(0, reps));
      if (category === 'comidas') setRecommendationsData(data.drinks.slice(0, reps));
    };
    fetchAPI();
  }, [category, setRecommendationsData]);

  return (
    <div className="details-container">
      <HeaderDetails
        title={ detailsData.strMeal || detailsData.strDrink }
        category={ `${detailsData.strAlcoholic || detailsData.strCategory}` }
        photo={ detailsData.strMealThumb || detailsData.strDrinkThumb }
        data={ detailsData }
      />
      <Ingredients data={ detailsData } />
      <Instructions instructions={ detailsData.strInstructions } />
      {(category === 'comidas') && <div><Video src={ detailsData.strYoutube } /></div>}
      <Recommendations data={ recommendationsData } />
      <StartButton category={ category } id={ id } />
    </div>
  );
}
