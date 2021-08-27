import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipes from '../components/CardRecipes';
import { drinkFetch } from '../redux/actions/actionDrink';

function MainDrink() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(drinkFetch());
  }, []);

  const drinksCardList = useSelector(({ drinkReducer }) => drinkReducer.drinksCardList);
  console.log(drinksCardList);

  if (drinksCardList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Bebidas" />
      {drinksCardList.map((item) => <CardRecipes key={ item.idDrink } title={ item.strDrink } image={ item.strDrinkThumb } />)}
      <Footer />
    </>
  );
}

export default MainDrink;
