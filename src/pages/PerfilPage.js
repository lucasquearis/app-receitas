import React from 'react';
import { Header, FooterMenu } from '../components';

export default function PerfilPage() {
  return (
    <div>
      <Header title="Perfil" showSearchIcon={ false } />
      Eu sou o Perfil Page
      <FooterMenu />
    </div>
  );
}
