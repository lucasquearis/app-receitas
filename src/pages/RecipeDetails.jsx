import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../components/Details';
import './RecipeDetails.css';
import urlApiHandle, { DataManeger } from '../services/urlApiHandle';

function RecipeDetails() {
  const [Data, setDataRecipe] = useState(undefined);

  const { id, receita } = useParams();

  useEffect(() => {
    const fetchEffect = async () => {
      try {
        const fetchApi = await fetch(urlApiHandle(id, receita)[0]);
        const thedata = await fetchApi.json();
        const managedData = DataManeger(thedata, receita);
        const fetchApiRecomend = await fetch(urlApiHandle(id, receita)[1]);
        const thedataRecomend = await fetchApiRecomend.json();
        const finalobj = [managedData, thedataRecomend];
        setDataRecipe(finalobj);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEffect();
  }, [id, receita]);

  if (!Data) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    <Details
      DetailedRecipe={ Data[0] }
      RecomendedRecipe={ Data[1] }
      Id={ id }
      Receita={ receita }
      InProgress={ false }
    />
  );
}

export default RecipeDetails;
