import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';

export default function Meals() {
  return (
    <main>
      <Header title="Página Não Encontrada" searchIcon={ searchIcon } />
      <span>Erro: Not Found</span>
      <Footer />
    </main>
  );
}
