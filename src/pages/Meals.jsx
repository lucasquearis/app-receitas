import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';

export default function Meals() {
  return (
    <main>
      <Header title="Comidas" searchIcon={ searchIcon } />
      <Footer />
    </main>
  );
}
