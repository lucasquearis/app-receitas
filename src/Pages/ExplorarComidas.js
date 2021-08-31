import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as ComidasAPI from '../service/ComidasAPI';

export default function ExplorarComidas() {
  const [receita, setreceita] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const pegarComida = async () => {
      const result = await ComidasAPI.buscarAleatoria();
      setreceita(result);
      setShowBtn(true);
    };
    pegarComida();
  }, []);

  const getLink = () => {
    if (showBtn) {
      return (
        <Link to={ `/comidas/${receita[0].idMeal}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      );
    }
    return (
      <Link to="/comidas">
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
    );
  };

  return (
    <main>
      <section>
        <Header title="ExplorarComidas" searchIcon />
      </section>
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
      { getLink() }
      <Footer />
    </main>
  );
}
