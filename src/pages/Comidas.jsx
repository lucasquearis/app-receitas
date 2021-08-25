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
  const [toggleCategory, setToggleCategory] = useState('');

  useEffect(() => {
    setFoodData({
      ...food,
    });
    setFoodCategories(
      categories.meals,
    );
  }, [food, categories]);

  console.log(toggleCategory);

  return loading
    ? <div>Loading... </div>
    : (
      <>
        <Categories
          type="food"
          action="filterCategory"
          list={ foodCategories }
          callback={ setFoodData }
          setLoading={ setLoading }
          toggle={ toggleCategory }
          toggleCallback={ setToggleCategory }
        />
        <CardList
          list={ foodData.meals }
          apiType="Meal"
        />
        <Footer />
      </>
    );
}

export default Comidas;
