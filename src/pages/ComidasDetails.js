import React, { useState, useEffect } from 'react';

function ComidasDetails(props) {
  const [meal, setMeal] = useState({});
  useEffect(() => {
    const getMeal = async () => {
      const { match: { params : { id } } } = props;
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const data = await response.json();
      setMeal(data.meals[0]);
    }
    getMeal();
  }, []);

  return (
    <main>
      Comidas Detalhes
    </main>
  );
}

export default ComidasDetails;
