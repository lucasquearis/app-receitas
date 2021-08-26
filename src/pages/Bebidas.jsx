import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import HookBebidas from '../hooks/HookBebidas';
import CardList from '../components/CardList';
import Categories from '../components/Categories';
import '../cssPages/Refeicao.css';

function Bebidas() {
  const [drinkData, setDrinkData] = useState({});
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drink, loading, categories, setLoading] = HookBebidas();
  const [toggleCategory, setToggleCategory] = useState('');

  useEffect(() => {
    setDrinkData({
      ...drink,
    });
    setDrinkCategories(
      categories.drinks,
    );
  }, [drink, categories]);

  return loading
    ? <div>Loading... </div>
    : (
      <>
        <Categories
          type="drink"
          action="filterCategory"
          list={ drinkCategories }
          callback={ setDrinkData }
          setLoading={ setLoading }
          toggle={ toggleCategory }
          toggleCallback={ setToggleCategory }
        />
        <CardList
          list={ drinkData.drinks }
          apiType="Drink"
          page="bebidas"
        />
        <Footer />
      </>
    );
}

export default Bebidas;
