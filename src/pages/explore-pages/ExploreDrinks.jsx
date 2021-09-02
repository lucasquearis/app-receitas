import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import myContext from '../../context/myContext';

function ExploreDrinks(props) {
  const { history } = props;
  const { randomDrink } = useContext(myContext);

  const handleClick = () => {
    history.push(`/bebidas/${randomDrink[0].idDrink}`);
  };

  return (
    <div>
      <Header brand="Explorar Bebidas" className="img-search" />
      <div className="div-explore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])),
}.isRequired;

export default ExploreDrinks;
