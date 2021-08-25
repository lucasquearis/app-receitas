import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const [meal, setMeal] = useState({});
  useEffect(() => {
    const getMeal = async () => {
      const URL = 'www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
    }
    getMeal();
  }, []);
  return (
    <div>
      <Header title="Comidas" />
      <main>

      </main>
      <Footer />
    </div>
  );
}

export default Comidas;
