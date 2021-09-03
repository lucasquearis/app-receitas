import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { drinkRandomFetch } from '../redux/actions/actionDrink';
import './Explore.css';

function ExploreDrink() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(drinkRandomFetch());
  }, [dispatch]);
  const randomID = useSelector(({ drinkReducer }) => drinkReducer.drinkRandom);
  return (
    <>
      <Header title="Explorar Bebidas" />
      <div className="explore-drink">
        <Link to="/explorar/bebidas/ingredientes" data-testid="explore-by-ingredient">
          <Button
            className="btn-explore-drink"
            type="button"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to={ `/bebidas/${randomID}` } data-testid="explore-surprise">
          <Button
            className="btn-explore-drink"
            type="button"
          >
            Me Surpreenda!
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrink;
