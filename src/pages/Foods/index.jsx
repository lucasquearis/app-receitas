import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchFoodRedux } from '../../redux/actions/foodActions';
import FoodsCards from '../../components/FoodsCard';
import CategoryFoodBtn from '../../components/CategoryFoodBtn';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

function Foods() {
  const dispatch = useDispatch();
  const foodsLimits = 12;
  const { meals, redirect } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchFoodRedux);
  }, [dispatch]);

  const headerProps = {
    title: 'Comidas',
    renderSearchBar: true,
  };

  // if (meals.length === 0 || !meals) {
  //   return (
  //     <h1>Loading</h1>
  //   );
  // }

  if (redirect) {
    return <Redirect to={ `/comidas/${redirect}` } />;
  }

  return (
    <section className="food-section">
      <Header { ...headerProps } />
      <div className="recipes-list">
        <CategoryFoodBtn />
        {meals && meals.slice(0, foodsLimits).map(
          (food, id) => FoodsCards(
            food, 'comidas', id,
          ),
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Foods;
