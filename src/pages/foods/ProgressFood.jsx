import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import ProgressFoodCard from './ProgressFoodCard';

const ProgressFood = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});
  const GetRecipe = () => {
    const fetchApi = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(url).then((r) => r.json());
      setRecipe(meals[0]);
    };
    fetchApi();
  };
  useEffect(GetRecipe, []);
  return (
    <div>
      <ProgressFoodCard recipe={ recipe } id={ id } />

    </div>
  );
};

ProgressFood.propTypes = {
  match: shape({
    url: string,
    params: shape({ id: string }) }).isRequired,
};

export default ProgressFood;
