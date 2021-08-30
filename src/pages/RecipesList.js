import React, { useEffect } from 'react';
import HeaderSearchBar from '../components/HeaderSearchBar';

function RecipeList() {
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      console.log(data);
    };

    fetchAPI();
  }, []);

  return (
    <HeaderSearchBar />
  );
}

export default RecipeList;
