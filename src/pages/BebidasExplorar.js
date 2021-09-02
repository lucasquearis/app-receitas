import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

function BebidasExplorar() {
  const { drinkRandom } = useContext(RecipesContext);
  return (
    <div>
      <Header title="Explorar Bebidas" renderSearch={ false } />
      <div className="d-flex flex-column align-items-center mt-4 w-100">
        <Link
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="btn btn-info explore-button mb-3"
        >
          Por Ingredientes
        </Link>
        <Link
          to={ `/bebidas/${drinkRandom}` }
          data-testid="explore-surprise"
          className="btn btn-info explore-button mb-3"
        >
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default BebidasExplorar;
