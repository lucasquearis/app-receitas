import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useFetchRandomApiDrinks } from '../customHooks/useFetchRandomApi';

export default function ExploreDrinks() {
  const { dataRandomDrinks } = useContext(Context);
  const [getRandomDrinksApi] = useFetchRandomApiDrinks();

  useEffect(() => { getRandomDrinksApi(); }, []);

  const history = useHistory(); // faz o papel do Redirect que não sei pq raios não funcionou aqui =/

  const randomDrinks = () => {
    history.push(`/bebidas/${dataRandomDrinks[0].idDrink}`);
  };

  return (
    <main>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="explore-button"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        className="explore-button"
        onClick={ randomDrinks }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </main>
  );
}
