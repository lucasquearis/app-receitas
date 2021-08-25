import React, { useContext } from 'react';
import FoodContext from '../context/FoodContext';

const FoodDetails = () => {
  const { foodDetails } = useContext(FoodContext);

  foodDetails.map(({ idMeal }) => console.log(idMeal));

  return (
    <div>
      Detalhes da comida
      {/* <div>
        <img data-testid="recipe-photo" />
        <h3 data-testid="recipe-title" />
        <button data-testid="share-btn" />
        <button data-testid="favorite-btn" />
        <p data-testid="recipe-category" />
      </div> */}
      {/* { foodDetails && foodDetails.slice(0, 1).map((data) => console.log(data)) } */}
    </div>

  );
};

export default FoodDetails;
