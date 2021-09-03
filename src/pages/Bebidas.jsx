import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HookBebidas from '../hooks/HookBebidas';
import CardList from '../components/CardList';
import Categories from '../components/Categories';
import MyContext from '../context/MyContext';
import loadMount from '../Functions/loadMount';
import '../cssPages/Refeicao.css';

function Bebidas() {
  const { filterByIng, renderDrinks, dataDrinks, setFilterByIng } = useContext(MyContext);
  const [drinkData, setDrinkData] = useState({});
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drink, loading, categories, setLoading] = HookBebidas();
  const [toggleCategory, setToggleCategory] = useState('All');

  useEffect(() => {
    setDrinkData({
      ...drink,
    });
    setDrinkCategories(
      categories.drinks,
    );
  }, [drink, categories]);

  useEffect(() => () => {
    setFilterByIng(null);
  }, [setFilterByIng]);

  const changeRender = (condition) => {
    if (condition) {
      return (<CardList
        list={ dataDrinks }
        apiType="Drink"
        page="bebidas"
      />);
    }
    return (
      <CardList
        list={ filterByIng ? filterByIng.drinks : drinkData.drinks }
        apiType="Drink"
        page="bebidas"
      />
    );
  };

  return loading
    ? loadMount('Bebidas', 'true', 'drinkStyle')
    : (
      <>
        <Header titulo="Bebidas" pesquisa="true" className="drinkStyle" />
        <div className="pageComida">
          <Categories
            type="drink"
            action="filterCategory"
            list={ drinkCategories }
            callback={ setDrinkData }
            setLoading={ setLoading }
            toggle={ toggleCategory }
            toggleCallback={ setToggleCategory }
          />
          {changeRender(renderDrinks)}
        </div>
        <Footer />
      </>
    );
}

export default Bebidas;
