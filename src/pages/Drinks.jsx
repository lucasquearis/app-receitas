import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';

export default function Drinks() {
  return (
    <main>
      <Header title="Bebidas" searchIcon={ searchIcon } />
      <Footer />
    </main>
  );
}
