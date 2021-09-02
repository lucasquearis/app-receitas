import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksRedux } from '../../redux/actions/foodActions';
import DrinksCards from '../../components/DrinksCard';
import CategoryDrinkBtn from '../../components/CategoryDrinkBtn';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

function Drinks() {
  const dispatch = useDispatch();
  const drinksLimits = 12;
  const { drinks, redirect } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchDrinksRedux);
  }, [dispatch]);

  const headerProps = {
    title: 'Bebidas',
    renderSearchBar: true,
  };

  if (redirect) {
    return <Redirect to={ `/bebidas/${redirect}` } />;
  }

  return (
    <section className="drink-section">
      <Header { ...headerProps } />
      <div className="recipes-list">
        <CategoryDrinkBtn />

        {drinks && drinks.slice(0, drinksLimits).map(
          (drink, id) => DrinksCards(
            drink, 'bebidas', id,
          ),
        )}

      </div>
      <Footer />
    </section>
  );
}

export default Drinks;
