import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import { ExploreButtons, ExploreWrapper } from './styles';
import { RecipesContext } from '../../context/RecipesContext';

const Explorar = ({ match: { params: { param1, param2 } } }) => {
  const { history } = useContext(RecipesContext);
  if (param1 === undefined) {
    return (
      <>
        <Header title="Explorar" hideSearch routeParams={ [param1, param2] } />
        <ExploreWrapper>
          <ExploreButtons
            data-testid="explore-food"
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explorar Comidas
          </ExploreButtons>
          <ExploreButtons
            data-testid="explore-drinks"
            onClick={ () => history.push('/explorar/bebidas') }
          >
            Explorar Bebidas
          </ExploreButtons>
        </ExploreWrapper>
        <Footer />
      </>
    );
  }
  return <h1>Loading</h1>;
};
Explorar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(String),
  }),
};

Explorar.defaultProps = {
  match: undefined,
};

export default Explorar;
