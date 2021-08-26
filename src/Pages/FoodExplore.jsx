import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ButtonCard from '../Components/ButtonCard';
import { getRandomId } from '../helper';

function FoodExplore() {
  const randomId = getRandomId();
  const path = `/comidas/${randomId}`;

  return (
    <div>
      <Header />
      <ButtonCard
        page="/explorar/comidas/ingredientes"
        testId="explore-by-ingredient"
        buttonText="Por Ingredientes"
      />
      <ButtonCard
        page="/explorar/comidas/area"
        testId="explore-by-area"
        buttonText="Por Local de Origem"
      />
      <ButtonCard
        page={ path }
        testId="explore-surprise"
        buttonText="Me Surpreenda!"
      />
      <Footer />
    </div>
  );
}

export default FoodExplore;
