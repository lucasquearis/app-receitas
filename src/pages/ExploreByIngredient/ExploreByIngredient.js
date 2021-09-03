import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../Context/DataContext';
import Header from '../../components/Header';
import IngredientsList from '../../components/ExploreByIngredient/IngredientsList';
import Footer from '../../components/Footer/Footer';
import './ExploreByIngredient.css';

function ExploreByIngredients() {
  const location = useLocation();
  const { setSelIngredient } = useData();
  const [ingredientsData, setIngredientsData] = useState([]);
  const [database, setDatabase] = useState('');
  const [databaseKey, setDatabaseKey] = useState('');

  useEffect(() => {
    switch (location.pathname.split('/')[2]) {
    case 'comidas':
      setDatabase('themealdb');
      setDatabaseKey('meals');
      break;
    case 'bebidas':
      setDatabase('thecocktaildb');
      setDatabaseKey('drinks');
      break;
    default:
      console.log('Failed to set database!');
    }
  }, [location.pathname]);

  useEffect(() => {
    const URL = `https://www.${database}.com/api/json/v1/1/list.php?i=list`;
    const getIngredients = async () => {
      const max = 12;
      const response = await fetch(URL);
      const data = await response.json();
      if (data[databaseKey].length > max) data[databaseKey].length = max;
      setIngredientsData(data[databaseKey]);
    };
    getIngredients();
  }, [database, databaseKey, setIngredientsData]);

  const handleIngredientClick = (ingredient) => {
    setSelIngredient(ingredient);
  };

  return (
    <div className="explo-ingre-container">
      <Header title="Explorar Ingredientes" />
      <IngredientsList
        ingredientsData={ ingredientsData }
        databaseKey={ databaseKey }
        database={ database }
        onClick={ handleIngredientClick }
      />
      <Footer />
    </div>
  );
}

export default ExploreByIngredients;
