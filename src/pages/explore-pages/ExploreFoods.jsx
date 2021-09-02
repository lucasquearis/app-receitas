import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import Header from '../../components/Header';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';
import myContext from '../../context/myContext';

function ExploreFoods(props) {
  const { history } = props;
  const { randomFood } = useContext(myContext);

  const handleClick = () => {
    history.push(`/comidas/${randomFood[0].idMeal}`);
    console.log(randomFood);
  };

  return (
    <div>
      <Header brand="Explorar Comidas" className="img-search" />
      <div className="div-explore">
        <Link to="/explorar/comidas/ingredientes">
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

ExploreFoods.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])),
}.isRequired;

export default ExploreFoods;
