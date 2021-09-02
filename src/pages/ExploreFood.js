import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFood() {
  const { push } = useHistory();

  const handleClick = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php',
      );
      const { meals } = await response.json();
      push(`/comidas/${meals[0].idMeal}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="categories">
        <Link to="/explorar/comidas/ingredientes">
          <button className="btn btn-success" type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button className="btn btn-success" type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <button
          className="btn btn-success"
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
        <Footer />
        </div>
    </div>
  );
}
export default ExploreFood;
