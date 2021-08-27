import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import MainContent from './MainContent';

function Explorar() {
  const { pathname } = useLocation();
  return (
    <>
      <Header
        pageTitle="Explorar"
        showSearchBtn={ false }
      />
      {(pathname === '/explorar') && <MainContent />}
      <MenuInferior />
    </>
  );
}

export default Explorar;
