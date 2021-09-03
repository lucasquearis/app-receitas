import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { foodRandomFetch } from '../redux/actions/actionFood';
import './Explore.css';

function ExploreFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(foodRandomFetch());
  }, [dispatch]);

  const randomID = useSelector(({ foodReducer }) => foodReducer.foodRandom);

  return (
    <>
      <Header title="Explorar Comidas" />
      <div className="explore-drink">
        <Link to="/explorar/comidas/ingredientes" data-testid="explore-by-ingredient">
          <Button
            className="btn-explore-food"
            type="button"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to="/explorar/comidas/area" data-testid="explore-by-area">
          <Button
            className="btn-explore-food"
            type="button"
          >
            Por Local de Origem
          </Button>
        </Link>
        <Link to={ `/comidas/${randomID}` } data-testid="explore-surprise">
          <Button
            className="btn-explore-food"
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

export default ExploreFood;
