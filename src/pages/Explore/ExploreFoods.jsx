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
        <section className="explore-food-father">
          <section className="explore-ingredient">
            <button
              type="button"
              className="explore-btn"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </section>
        </section>
      </Link>
      <Link to="/explorar/comidas/area">
        <section className="explore-food-father">
          <section className="explore-origin">
            <button
              type="button"
              className="explore-btn"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </section>
        </section>
      </Link>
      <section className="explore-food-father">
        <section className="surprise-me">
          <button
            type="button"
            className="explore-btn"
            data-testid="explore-surprise"
            onClick={ () => SurpriseMe() }
          >
            Me Surpreenda!
          </button>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
