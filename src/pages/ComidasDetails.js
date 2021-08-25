import React, { useState, useEffect } from 'react';

function ComidasDetails() {
  const [meal, setMeal] = useState({});
  useEffect(() => {
    const getMeal = async () => {
      const URL = 'www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
    }
    getMeal()
  }, []);

  return (
    <main>
      Comidas Detalhes
    </main>
  );
}

export default ComidasDetails;
