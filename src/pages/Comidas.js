import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import Card from '../components/Card';
import Loading from '../components/Loading';

export default function Comidas() {
  const history = useHistory();
  const { setRecipeType, meals } = useContext(Context);
  setRecipeType('meals');

  if (meals.length === 1) {
    return history.push(`/comidas/${meals[0].idMeal}`);
  }

  if (meals.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Header>
        Comidas
      </Header>
      <MenuInferior />
      <div>
        { (meals !== []) && meals.map((item, index) => (
          <div key={ item.idMeal }>
            { `categoria: ${item.strCategory}` }
            <Link to={ `/comidas/${item.idMeal}` }>
              <Card item={ item } index={ index } />
            </Link>
          </div>
        )) }
      </div>
    </div>
  );
}
