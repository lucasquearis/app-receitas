import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/header';

const Perfil = () => (
  <>
    <Header
      title="Perfil"
      hideSearch
      routeParams={ [undefined, undefined] }
    />
    <Footer />
  </>
);

export default Perfil;
