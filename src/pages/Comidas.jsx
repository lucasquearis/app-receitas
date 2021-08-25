import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import HookComidas from '../hooks/HookComidas';
import CardList from '../components/CardList';
import Categories from '../components/Categories';
import '../cssPages/Comidas.css';

function Comidas() {
  const [foodData, setFoodData] = useState({});
  const [foodCategories, setFoodCategories] = useState([]);
  const [food, loading, categories, setLoading] = HookComidas();

  useEffect(() => {
    setFoodData({
      ...food,
    });
    setFoodCategories(
      categories.meals,
    );
  }, [food, categories, setFoodData]);

  return loading
    ? <div>Loading... </div>
    : (
      <>
        <Categories
          list={ foodCategories }
          callback={ setFoodData }
          setLoading={ setLoading }
        />
        <CardList
          list={ foodData.meals }
          thumbValue="strMealThumb"
          nameValue="strMeal"
        />
        <Footer />
      </>
    );
}

export default Comidas;
