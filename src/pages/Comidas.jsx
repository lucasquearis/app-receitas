import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HookComidas from '../hooks/HookComidas';
import CardList from '../components/CardList';
import Categories from '../components/Categories';
import '../cssPages/Refeicao.css';

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

  return loading
    ? <div>Loading... </div>
    : (
      <>
        <Header titulo="Comidas" pesquisa="true" />
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
          page="comidas"
        />
        <Footer />
      </>
    );
}

export default Comidas;
