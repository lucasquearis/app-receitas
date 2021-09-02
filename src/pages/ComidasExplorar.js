import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

function ComidasExplorar() {
  const { mealRandom } = useContext(RecipesContext);
  return (
    <div>
      <Header title="Explorar Comidas" renderSearch={ false } />
      <div className="d-flex flex-column align-items-center mt-4 w-100">
        <Link
          to="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="btn btn-info explore-button mb-3"
        >
          Por Ingredientes
        </Link>
        <Link
          to="/explorar/comidas/area"
          data-testid="explore-by-area"
          className="btn btn-info explore-button mb-3"
        >
          Por Local de Origem
        </Link>
        <Link
          to={ `/comidas/${mealRandom}` }
          data-testid="explore-surprise"
          className="btn btn-info explore-button"
        >
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ComidasExplorar;
