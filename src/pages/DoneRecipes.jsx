import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
      <div>Receitas Feitas</div>
      <Footer />
    </div>
  );
}
