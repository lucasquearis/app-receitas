import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HookComidas from '../hooks/HookComidas';
import CardList from '../components/CardList';
import Categories from '../components/Categories';
import MyContext from '../context/MyContext';
import '../cssPages/Refeicao.css';

function Comidas() {
  const { filterByIng } = useContext(MyContext);
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
          list={ filterByIng ? filterByIng.meals : foodData.meals }
          apiType="Meal"
          page="comidas"
        />
        <Footer />
      </>
    );
}

export default Comidas;
