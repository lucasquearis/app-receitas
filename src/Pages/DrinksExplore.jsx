import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ButtonCard from '../Components/ButtonCard';
import { getRandomId } from '../helper';

function DrinksExplore() {
  const randomId = getRandomId();
  const path = `/comidas/${randomId}`;

  return (
    <div>
      <Header title="Bebidas" loading />
      <Footer />
      <ButtonCard
        page="/explorar/bebidas/ingredientes"
        testId="explore-by-ingredient"
        buttonText="Por Ingredientes"
      />
      <ButtonCard
        page={ path }
        testId="explore-surprise"
        buttonText="Me Surpreenda!"
      />
    </div>
  );
}

export default DrinksExplore;
