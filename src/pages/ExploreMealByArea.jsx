import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer/Footer';

export default function ExploreMealByArea() {
  return (
    <main>
      <Header title="Explorar Origem" searchIcon={ searchIcon } />
      <Footer />
    </main>
  );
}
