import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import { drinkCategoriesFetch, drinkListFetch } from '../redux/actions/actionDrink';
import DrinkCategories from '../components/DrinkCategories';
import './FoodCards.css';

function MainDrink() {
  const dispatch = useDispatch();
  const isClicked = useSelector(({ drinkReducer }) => drinkReducer.drinkIsClicked);
  useEffect(() => {
    if (!isClicked) {
      dispatch(drinkListFetch());
    }
    dispatch(drinkCategoriesFetch());
  }, [dispatch, isClicked]);

  const drinkCardList = useSelector(({ drinkReducer }) => drinkReducer.drinkCardList);

  if (drinkCardList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Bebidas" />
      <DrinkCategories />

      <div className="map-cards">
        {drinkCardList.map((item, index) => (
          <Link to={ `/bebidas/${item.idDrink}` } key={ item.idDrink }>
            <DrinkCard drink={ item } index={ index } />
          </Link>))}
      </div>
      <Footer />
    </>
  );
}

export default MainDrink;
