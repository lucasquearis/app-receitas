import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ComidasExplorar() {
  const { mealRandom } = useContext(RecipesContext);
  return (
    <div>
      <Header title="Explorar Comidas" renderSearch={ false } />
      <Link to="/explorar/comidas/ingredientes">
        <div className="card">
          <div className="card-body" data-testid="explore-by-ingredient">
            Por Ingredientes
          </div>
        </div>
      </Link>
      <Link to="/explorar/comidas/area">
        <div className="card">
          <div className="card-body" data-testid="explore-by-area">
            Por Local de Origem
          </div>
        </div>
      </Link>
      <Link to={ `/comidas/${mealRandom}` }>
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

export default ComidasExplorar;
