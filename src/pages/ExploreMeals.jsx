import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useFetchRandomApiMeals } from '../customHooks/useFetchRandomApi';

export default function ExploreMeals() {
  const { dataRandomMeals } = useContext(Context);
  const [getRandomMealsApi] = useFetchRandomApiMeals();

  useEffect(() => { getRandomMealsApi(); }, []);

  const history = useHistory(); // faz o papel do Redirect que não sei pq raios não funcionou aqui =/

  const randomMeals = () => {
    history.push(`/comidas/${dataRandomMeals[0].idMeal}`);
  };

  return (
    <main>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="explore-button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
          className="explore-button"
        >
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        className="explore-button"
        onClick={ randomMeals }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </main>
  );
}
