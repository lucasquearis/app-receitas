import React, { useContext } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
// import {fetchRecepies} from '../services/fechRecepies';

export default function () {
  const { meals } = useContext(Context);
  if (!meals.length) { return <span>LOADING...</span>; }

  console.log(meals);

  return (
    <div className="foods-page">
      <Header title="Comidas" />
      {meals.map((recepie, i) => (<h1 key={ i }>{recepie.strMeal}</h1>))}
    </div>
  );
}
