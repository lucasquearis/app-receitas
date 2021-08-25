import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas(props) {
  const { history: { location: { pathname } } } = props;
  console.log(pathname);
  return (
    <div>
      <Header titulo="Comidas" showProfileIcon="sim" pathname={ pathname } />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default Comidas;
