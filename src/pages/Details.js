import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderDetails from '../components/Details/HeaderDetails';
import Ingredients from '../components/Details/Ingredients';
import Instructions from '../components/Details/Instructions';
import { useData } from '../Context/DataContext';

export default function Details() {
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];
  const category = pathname.split('/')[1];

  const { detailsData, setDetailsData } = useData();

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

  return (
    <div>
      <HeaderDetails
        title={ detailsData.strMeal || detailsData.strDrink }
        category={ detailsData.strCategory }
        photo={ detailsData.strMealThumb || detailsData.strDrinkThumb }
      />
      <Ingredients data={ detailsData } />
      <Instructions instructions={ detailsData.strInstructions } />
    </div>
  );
}
