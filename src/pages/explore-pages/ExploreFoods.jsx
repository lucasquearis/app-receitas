import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import ArrowIcon from '../../images/ArrowIcon.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import myContext from '../../context/myContext';

function ExploreFoods() {
  const { randomFood, getRandomFood } = useContext(myContext);
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  useEffect(() => {
    getRandomFood();
  }, []);
  const handleClick = () => {
    history.push(`/comidas/${randomFood[0].idMeal}`);
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
      <button className="explore1" type="button" onClick={ goToPreviousPath }>
        <img className="explore" src={ ArrowIcon } alt="voltar" />
      </button>
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])),
}.isRequired;

export default ExploreFoods;
