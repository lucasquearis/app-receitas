import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BebidasExplorar() {
  const { drinkRandom } = useContext(RecipesContext);
  return (
    <div>
      <Header title="Explorar Bebidas" renderSearch={ false } />
      <Link to="/explorar/bebidas/ingredientes">
        <div className="card">
          <div className="card-body" data-testid="explore-by-ingredient">
            Por Ingredientes
          </div>
        </div>
      </Link>
      <Link to={ `/bebidas/${drinkRandom}` }>
        <div className="card">
          <div className="card-body" data-testid="explore-surprise">
            Me Surpreenda!
          </div>
        </div>
      </Link>
      <Footer />
    </div>
  );
}

export default BebidasExplorar;
