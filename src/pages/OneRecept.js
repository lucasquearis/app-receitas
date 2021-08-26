import React, { useContext } from 'react';
import '../styles/OneRecept.css';
import myContext from '../context/myContext';

export default function OneRecept() {
  const { filteredMealsOrDrinks } = useContext(myContext);
  const { meals } = filteredMealsOrDrinks;

  console.log(filteredMealsOrDrinks);
  return (
    <div className="container-one-recept">
      {meals.map((meal, i) => (
        <div key={ i }>
          <img src={ meal.strMealThumb } alt={ meal.str } />
          <h1>{meal.strMeal}</h1>
          <h3>{meal.strCategory}</h3>
          <div>
            <h3>Ingredient</h3>
            <ul>
              <li>{`${meal.strIngredient1} ${meal.strMeasure1}`}</li>
              <li>{`${meal.strIngredient2} ${meal.strMeasure2}`}</li>
              <li>{`${meal.strIngredient3} ${meal.strMeasure3}`}</li>
              <li>{`${meal.strIngredient4} ${meal.strMeasure4}`}</li>
              <li>{`${meal.strIngredient5} ${meal.strMeasure5}`}</li>
              <li>{`${meal.strIngredient6} ${meal.strMeasure6}`}</li>
              <li>{`${meal.strIngredient7} ${meal.strMeasure7}`}</li>
              <li>{`${meal.strIngredient8} ${meal.strMeasure8}`}</li>
              <li>{`${meal.strIngredient9} ${meal.strMeasure9}`}</li>
              <li>{`${meal.strIngredient10} ${meal.strMeasure10}`}</li>
              <li>{`${meal.strIngredient11} ${meal.strMeasure11}`}</li>
              <li>{`${meal.strIngredient12} ${meal.strMeasure12}`}</li>
              <li>{`${meal.strIngredient13} ${meal.strMeasure13}`}</li>
              <li>{`${meal.strIngredient14} ${meal.strMeasure14}`}</li>
              <li>{`${meal.strIngredient15} ${meal.strMeasure15}`}</li>
              <li>{`${meal.strIngredient16} ${meal.strMeasure16}`}</li>
              <li>{`${meal.strIngredient17} ${meal.strMeasure17}`}</li>
              <li>{`${meal.strIngredient18} ${meal.strMeasure18}`}</li>
              <li>{`${meal.strIngredient19} ${meal.strMeasure19}`}</li>
              <li>{`${meal.strIngredient20} ${meal.strMeasure20}`}</li>
            </ul>
          </div>
          <div>
            <h3>Instructions</h3>
            <p>{meal.strInstructions}</p>
          </div>
          <div>
            <h3>Video</h3>
            <iframe
              title="video"
              width="320"
              height="315"
              src={ meal.strYoutube }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// https://www.themealdb.com/api/json/v1/1/search.php?s=Egyptian+Fatteh
