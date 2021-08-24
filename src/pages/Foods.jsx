import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Foods() {
  return (
    <section>
      <Header pageTitle="Comidas" />
      <SearchBar />
    </section>
  );
}
