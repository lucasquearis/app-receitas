import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
// import { Container } from './styles';

const Explorar = ({ match: { params: { param1, param2 } } }) => (
  <Header title="Explorar" hideSearch routeParams={ [param1, param2] } />
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
