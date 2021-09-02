import React from 'react';
import { Link } from 'react-router-dom';
import MenuFooter from '../../components/MenuFooter';
import Header from '../../components/Header';
import './style/style.css';

export default function ExplorarBebidas() {
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
        <Link to="/explorar/bebidas/area">
          <button
            className="btn btn-warning button-size"
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          className="btn btn-warning button-size"
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <MenuFooter />
    </div>
  );
}
