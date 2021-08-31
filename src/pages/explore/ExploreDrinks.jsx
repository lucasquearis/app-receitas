import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRandomDrink } from '../../services/fetchApi';

export default function ExploreDrinks() {
  const [state, setState] = useState({
    redirect: false,
    id: '',
  });

  const getRandomDrink = async () => {
    const drinksData = await fetchRandomDrink();
    const drinkId = drinksData[0].idDrink;
    setState({
      redirect: true,
      id: drinkId,
    });
  };

  if (state.redirect) return <Redirect to={ `/bebidas/${state.id}` } />;

  return (
    <section>
      <Header title="Explorar Bebidas" />
      <h1>Explorar Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ getRandomDrink }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </section>
  );
}
