import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ButtonCard from '../Components/ButtonCard';
import '../styles/explorePages.css';

function DrinksExplore() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const surpriseMe = async () => {
      const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const response = await fetch(END_POINT);
      const { drinks } = await response.json();
      setData(drinks[0]);
    };
    surpriseMe();
  }, [setData]);

  const path = (id) => `/bebidas/${id}`;

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="explore-buttons">
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
      <Footer />
    </div>
  );
}

export default DrinksExplore;
