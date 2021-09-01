import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderSearchBar from '../components/HeaderSearchBar';
import genericFetchAPI from '../services/genericFetchAPI';

function RecipeList(title) {
  const { ingredient } = state;
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/comidas') {
    title = 'Comidas';
  }
  if (URL === '/bebidas') {
    title = 'Bebidas';
  }

  if (URL === '/comidas' && ingredient) {
    title = 'Comidas';
    genericFetchAPI('meal', 'filter', 'i', ingredient);
  }
  if (URL === '/bebidas' && ingredient) {
    title = 'Bebidas';
    genericFetchAPI('cocktail', 'filter', 'i', ingredient);
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
      <Footer />
    </div>
  );
}

export default RecipeList;
