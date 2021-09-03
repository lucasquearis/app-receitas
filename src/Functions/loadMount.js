import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const loadMount = (title, search, className) => (
  <>
    <Header titulo={ title } pesquisa={ search } className={ className } />
    <Loading />
    <Footer />
  </>
);

export default loadMount;
