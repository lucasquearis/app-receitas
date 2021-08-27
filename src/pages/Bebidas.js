import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function Bebidas() {
  const history = useHistory();
  const { cocktails, setRecipeType } = useContext(Context);
  setRecipeType('cocktail');
  if (cocktails.length === 1) {
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
      <MenuInferior />
      <div>
        { (cocktails !== []) && cocktails.map((item, index) => (
          <div key={ item.idDrink }>
            { `categoria: ${item.strCategory}` }
            <Link to={ `/bebidas/${item.idDrink}` }>
              <Card recipe={ item } index={ index } />
            </Link>
          </div>
        )) }
      </div>
    </div>
  );
}
