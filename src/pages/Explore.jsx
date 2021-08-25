import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  const { location: { pathname } } = useHistory();
  let title = pathname.includes('comida') ? 'Explorar Comidas' : 'Explorar Bebidas';
  title = pathname.includes('ingredientes') ? 'Explorar Ingredientes' : title;
  title = pathname.includes('area') ? 'Explorar Origem' : title;
  title = pathname === '/explorar' ? 'Explorar' : title;
  return (
    <>
      <Header title={ title } search={ title === 'Explorar Origem' } />
      <Footer />
    </>
  );
}
