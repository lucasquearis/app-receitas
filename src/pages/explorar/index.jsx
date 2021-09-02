import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/Footer';

const Explorar = ({ match: { params: { param1, param2 } } }) => (
  <>
    <Header title="Explorar" hideSearch routeParams={ [param1, param2] } />
    <Footer />
  </>
);

Explorar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(String),
  }),
};

Explorar.defaultProps = {
  match: undefined,
};

export default Explorar;
