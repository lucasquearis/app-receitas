import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <div>
      <Header titulo="Bebidas" showProfileIcon="sim" pathname={ pathname } />
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default Bebidas;
