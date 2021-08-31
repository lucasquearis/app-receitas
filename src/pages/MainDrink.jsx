import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import { drinkCategoriesFetch, drinkListFetch } from '../redux/actions/actionDrink';
import DrinkCategories from '../components/DrinkCategories';

function MainDrink() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(drinkListFetch());
    dispatch(drinkCategoriesFetch());
  }, [dispatch]);

  const drinkCardList = useSelector(({ drinkReducer }) => drinkReducer.drinkCardList);

  if (drinkCardList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Bebidas" />
      <DrinkCategories />
      {drinkCardList.map((item, index) => (
        <Link to={ `/bebidas/${item.idDrink}` } key={ item.idDrink }>
          <DrinkCard drink={ item } index={ index } />
        </Link>))}
      <Footer />
    </>
  );
}

export default MainDrink;
