import React from 'react';
import HeaderSearch from '../components/HeaderSearch';
import Footer from '../components/Footer';
import DropdownArea from '../components/DropdownArea';
import Cards from '../components/Cards';

function ExploreOrigin() {
  return (
    <div>
      <HeaderSearch title="Explorar Origem" />
      <DropdownArea />
      <Cards />
      <Footer />
    </div>
  );
}

export default ExploreOrigin;
