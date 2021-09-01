import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import urlApiHandle, { DataManeger } from '../services/urlApiHandle';
import Details from '../components/Details';

/* const getStorageInfo = (ID, TYPE) => {
  const obj = localStorage.getItem('favoriteRecipes');
  const objjson = JSON.parse(obj);
  if (objjson === null || objjson === undefined) return false;
  const workingObj = objjson.find((n) => n.[TYPE] === ID);
  if (workingObj === null || workingObj === undefined) return false;
  return true;
}; */

export default function InProgressRecipe() {
  const { id, type } = useParams();
  const [Data, setstorage] = useState(undefined);

  useEffect(() => {
    const fetchEffect = async () => {
      try {
        const fetchApi = await fetch(urlApiHandle(id, type)[0]);
        const thedata = await fetchApi.json();
        const managedData = DataManeger(thedata, type);
        setstorage(managedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEffect();
  }, [id, type]);

  if (!Data) {
    return (
      <h1>Loading</h1>
    );
  }

  return (
    <Details
      DetailedRecipe={ Data }
      RecomendedRecipe={ null }
      Id={ id }
      Receita={ type }
      InProgress
    />
  );
}
