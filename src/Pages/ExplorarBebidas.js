import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as BebidasAPI from '../service/BebidasAPI';

export default function ExplorarBebidas() {
  const [receita, setreceita] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const getDrink = async () => {
      const result = await BebidasAPI.seachDrinkRandom();
      setreceita(result);
      setShowBtn(true);
    };
    getDrink();
  }, []);

  const getLink = () => {
    if (showBtn) {
      return (
        <Link to={ `/bebidas/${receita[0].idDrink}` }>
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
      <Link to="/bebidas">
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
    <>
      <section>
        <Header title="ExplorarBebidas" searchIcon />
      </section>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      { getLink() }
      <Footer />
    </>
  );
}
