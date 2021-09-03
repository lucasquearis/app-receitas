import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import MenuFooter from '../../components/MenuFooter';
import Header from '../../components/Header';
import './style/style.css';
import fetchDrinkSurprise from '../../services/FetchDrinkSurprise';

export default function ExplorarBebidas() {
  const history = useHistory();
  const handleClick = async () => {
    const randomFetchDrink = await fetchDrinkSurprise();
    const id = randomFetchDrink[0].idDrink;
    history.push(`/bebidas/${id}`);
  };
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="container-button-explorar">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="btn btn-warning button-size"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>

        <button
          className="btn btn-warning button-size"
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <MenuFooter />
    </div>
  );
}
