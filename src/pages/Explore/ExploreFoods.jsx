import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreFoods() {
  const history = useHistory();

  const SurpriseMe = async () => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const { meals: [{ idMeal }] } = await fetch(endPoint)
      .then((response) => response.json());
    history.push(`/comidas/${idMeal}`);
  };

  const headerProps = {
    title: 'Explorar Comidas',
    renderSearchBar: false,
  };

  return (
    <div>
      <Header { ...headerProps } />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => SurpriseMe() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
