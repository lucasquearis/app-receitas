import React, { useEffect } from 'react';
import HeaderSearchBar from '../components/HeaderSearchBar';
import Footer from '../components/Footer';
import CategoryFood from '../components/CategoryFood';

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
    <div>
      <p>Recipe List</p>
      <CategoryFood />
      <HeaderSearchBar />
      <Footer />
    </div>
  );
}

export default RecipeList;
