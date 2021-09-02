import React, { useContext } from 'react';
import AliceCarousel from 'react-alice-carousel';
import AppContext from '../context/AppContext';
import RecomendationCard from './RecomendationCard';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function CarouselContainer() {
  const { recipeList } = useContext(AppContext);
  const SIX = 6;

  const responsive = {
    0: {
      items: 2,
    },
  };

  return (
    <AliceCarousel
      disableButtonsControls
      responsive={ responsive }
      items={

        recipeList && recipeList.slice(0, SIX).map((recipe, index) => (
          <RecomendationCard
            id={ recipe.idMeal || recipe.idDrink }
            key={ recipe.idMeal || recipe.idDrink }
            name={ recipe.strMeal || recipe.strDrink }
            img={ recipe.strMealThumb || recipe.strDrinkThumb }
            index={ index }
            pathnameAPI={ recipe.idMeal ? 'comidas' : 'bebidas' }
            aux={ recipe.idMeal ? recipe.strCategory : recipe.strAlcoholic }
            testId="recomendation-title"
          />
        ))
      }
    />
  );
}
