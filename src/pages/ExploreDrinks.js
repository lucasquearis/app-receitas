import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../services/cocktailAPI';

function ExploreDrinks() {
  const [id, setId] = useState('');

  useEffect(() => {
    async function getRandomDrink() {
      const data = await fetchRandomDrink();
      setId(data.drinks[0].idDrink);
    }
    getRandomDrink();
  }, []);

  const createBtn = (testId, text) => (
    <button data-testid={ testId } type="button">{ text }</button>
  );

  return (
    <section>
      <Header title="Explorar Bebidas" showRender={ false } />

      <Link to="/explorar/bebidas/ingredientes">
        { createBtn('explore-by-ingredient', 'Por Ingredientes') }
      </Link>

      <Link to={ `/bebidas/${id}` }>
        { createBtn('explore-surprise', 'Me Surpreenda!') }
      </Link>

      <Footer />
    </section>
  );
}

export default ExploreDrinks;
