import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ButtonCard from '../Components/ButtonCard';

function DrinksExplore() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const surpriseMe = async () => {
      const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const response = await fetch(END_POINT);
      const { drinks } = await response.json();
      setData(drinks[0]);
      console.log(data);
    };
    surpriseMe();
  });

  const path = (id) => `/bebidas/${id}`;

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
        page={ path(data.idDrink) }
        testId="explore-surprise"
        buttonText="Me Surpreenda!"
      />
    </div>
  );
}

export default DrinksExplore;
