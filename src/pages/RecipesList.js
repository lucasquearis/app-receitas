import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryFood from '../components/CategoryFood';
import CategoryDrink from '../components/CategoryDrink';
import HeaderSearchBar from '../components/HeaderSearchBar';

function RecipeList(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/comidas') {
    title = 'Comidas';
  }
  if (URL === '/bebidas') {
    title = 'Bebidas';
  }

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
      <Header title={ title } />
      <HeaderSearchBar />
      {(title === 'Comidas' ? <CategoryFood /> : <CategoryDrink />)}
      <Footer />
    </div>
  );
}

export default RecipeList;
