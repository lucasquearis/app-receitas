import React, { useEffect } from 'react';
import HeaderSearchBar from '../components/HeaderSearchBar';
import Footer from '../components/Footer';

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
      <HeaderSearchBar />
      <Footer />
    </div>
  );
}

export default RecipeList;
