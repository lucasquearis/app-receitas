import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Comidas(props) {
  const { history: { location: { pathname } } } = props;
  console.log(pathname);
  return (
    <div>
      <Header titulo="Comidas" showProfileIcon="sim" pathname={ pathname } />
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
