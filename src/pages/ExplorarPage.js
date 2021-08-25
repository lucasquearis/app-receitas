import React from 'react';
import { Header, FooterMenu } from '../components';

export default function ExplorarPage() {
  return (
    <div>
      <Header title="Explorar" showSearchIcon={ false } />
      Eu sou o Explorar Page
      <FooterMenu />
    </div>
  );
}
