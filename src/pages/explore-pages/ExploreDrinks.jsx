import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import Header from '../../components/Header';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';
import '../../styles/Explore.css';
import myContext from '../../context/myContext';

function ExploreDrinks(props) {
  const { history } = props;
  const { randomDrink } = useContext(myContext);

  const handleClick = () => {
    history.push(`/bebidas/${randomDrink[0].idDrink}`);
    console.log(randomDrink);
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
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
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
