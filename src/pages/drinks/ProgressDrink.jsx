import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import ProgressDrinkCard from './ProgressDrinkCard ';

const ProgressDrink = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});
  const GetRecipe = () => {
    const fetchApi = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(url).then((r) => r.json());
      setRecipe(drinks[0]);
    };
    fetchApi();
  };
  useEffect(GetRecipe, [id]);

  return (
    <div>
      <ProgressDrinkCard recipe={ recipe } id={ id } />
    </div>
  );
};

ProgressDrink.propTypes = {
  match: shape({
    url: string,
    params: shape({ id: string }) }).isRequired,
};

export default ProgressDrink;
