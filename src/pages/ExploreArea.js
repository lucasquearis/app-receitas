import React from 'react';
import {
  Footer,
  Header,
} from '../components';

const ExploreArea = () => {
  const pageName = 'Explorar Origem';
  return (
    <div>
      <Header page={ pageName } search />
      Explorar Comida por Local de Origem
      <Footer />
    </div>
  );
};

export default ExploreArea;
