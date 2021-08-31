import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { foodRandomFetch } from '../redux/actions/actionFood';

function ExploreFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(foodRandomFetch());
  }, [dispatch]);

  const randomID = useSelector(({ foodReducer }) => foodReducer.foodRandom);

  return (
    <>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes" data-testid="explore-by-ingredient">
        <button
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area" data-testid="explore-by-area">
        <button
          type="button"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${randomID}` } data-testid="explore-surprise">
        <button
          type="button"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default ExploreFood;
