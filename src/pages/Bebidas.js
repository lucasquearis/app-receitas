import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import Card from '../components/Card';
import Loading from '../components/Loading';
import CategoriesBar from '../components/CategoriesBar';

export default function Bebidas() {
  const history = useHistory();
  const {
    cocktails,
    setRecipeType,
    category,
    exploreIngredient,
  } = useContext(Context);
  setRecipeType('cocktail');

  if (exploreIngredient.length > 0) {
    return (
      <div>
        <Header recipeType="drinks">
          Bebidas
        </Header>
        <CategoriesBar />
        <MenuInferior />
        <div>
          {
            exploreIngredient.map((item, index) => {
              const MAXLENGHT = 11;
              if (index <= MAXLENGHT) {
                return (
                  <div key={ item.idDrink }>
                    { `categoria: ${item.strCategory}` }
                    <Link to={ `/bebidas/${item.idDrink}` }>
                      <Card item={ item } index={ index } />
                    </Link>
                  </div>
                );
              }
              return null;
            })
          }
        </div>
      </div>
    );
  }

  if (cocktails.length === 1 && category === 'All') {
    return history.push(`/bebidas/${cocktails[0].idDrink}`);
  }

  if (cocktails.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Header recipeType="drinks">
        Bebidas
      </Header>
      <CategoriesBar />
      <MenuInferior />
      <div>
        { (cocktails.length !== 0) && cocktails.map((item, index) => (
          <div key={ item.idDrink }>
            { `categoria: ${item.strCategory}` }
            <Link to={ `/bebidas/${item.idDrink}` }>
              <Card item={ item } index={ index } />
            </Link>
          </div>
        )) }
      </div>
    </div>
  );
}
