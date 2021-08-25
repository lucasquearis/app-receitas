import React from 'react';
import { Header, FooterMenu } from '../components';

export default function ExplorarComidasPage() {
  return (
    <div>
      <Header title="Explorar Comidas" showSearchIcon={ false } />
      Eu sou o Explorar Comidas Page
      <FooterMenu />
    </div>
  );
}
