import React, { useContext } from 'react';
import '../styles/OneRecept.css';
import myContext from '../context/myContext';

export default function OneDrink() {
  const { updateData } = useContext(myContext);
  if (!updateData) return <p>Loading...</p>;
  console.log(updateData);
  return (
    <div className="container-one-recept">
      {updateData.map((data, i) => (
        <div key={ i }>
          <img src={ data.strDrinkThumb } alt={ data.strDrink } />
          <h1>{data.strDrink}</h1>
          <h3>{data.strCategory}</h3>
          <div>
            <h3>Ingredient</h3>
            <ul>
              <li>{`${data.strIngredient1} ${data.strMeasure1}`}</li>
              <li>{`${data.strIngredient2} ${data.strMeasure2}`}</li>
              <li>{`${data.strIngredient3} ${data.strMeasure3}`}</li>
              <li>{`${data.strIngredient4} ${data.strMeasure4}`}</li>
              <li>{`${data.strIngredient5} ${data.strMeasure5}`}</li>
              <li>{`${data.strIngredient6} ${data.strMeasure6}`}</li>
              <li>{`${data.strIngredient7} ${data.strMeasure7}`}</li>
              <li>{`${data.strIngredient8} ${data.strMeasure8}`}</li>
              <li>{`${data.strIngredient9} ${data.strMeasure9}`}</li>
              <li>{`${data.strIngredient10} ${data.strMeasure10}`}</li>
              <li>{`${data.strIngredient11} ${data.strMeasure11}`}</li>
              <li>{`${data.strIngredient12} ${data.strMeasure12}`}</li>
              <li>{`${data.strIngredient13} ${data.strMeasure13}`}</li>
              <li>{`${data.strIngredient14} ${data.strMeasure14}`}</li>
              <li>{`${data.strIngredient15} ${data.strMeasure15}`}</li>
            </ul>
          </div>
          <div>
            <h3>Instructions</h3>
            <p>{data.strInstructions}</p>
          </div>
        </div>
      ))}
    </div>
  );
}