import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomMeal } from '../services/mealAPI';

function ExploreFoods() {
  const [id, setId] = useState('');

  useEffect(() => {
    async function getRandomMeal() {
      const data = await fetchRandomMeal();
      setId(data.meals[0].idMeal);
    }
    getRandomMeal();
  }, []);

  const createBtn = (testId, text) => (
    <button data-testid={ testId } type="button">{ text }</button>
  );

  return (
    <section>
      <Header title="Explorar Comidas" showRender={ false } />

      <Link to="/explorar/comidas/ingredientes">
        { createBtn('explore-by-ingredient', 'Por Ingredientes') }
      </Link>

      <Link to="/explorar/comidas/area">
        { createBtn('explore-by-area', 'Por Local de Origem') }
      </Link>

      <Link to={ `/comidas/${id}` }>
        { createBtn('explore-surprise', 'Me Surpreenda!') }
      </Link>

      <Footer />
    </section>
  );
}

export default ExploreFoods;
