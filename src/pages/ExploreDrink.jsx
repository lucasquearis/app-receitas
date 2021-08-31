import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { drinkRandomFetch } from '../redux/actions/actionDrink';
import './ExploreDrink.css';

function ExploreDrink() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(drinkRandomFetch());
  }, [dispatch]);
  const randomID = useSelector(({ drinkReducer }) => drinkReducer.drinkRandom);
  return (
    <>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes" data-testid="explore-by-ingredient">
        <button
          className="buttonUp"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomID}` } data-testid="explore-surprise">
        <button
          className="buttonDown"
          type="button"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default ExploreDrink;
