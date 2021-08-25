import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Favoritas" search={ false } />
      <div>Receitas Favoritas</div>
      <Footer />
    </div>
  );
}
