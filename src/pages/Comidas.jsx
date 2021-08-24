import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import fetchFoods from '../fetchs/FetchFood';
import HookComidas from '../hooks/HookComidas';

function Comidas() {
  // const { data, setData, loading, setLoading } = useContext(MyContext);

  const [foodData, setFoodData] = useState({});
  const [food, loading] = HookComidas();

  useEffect(() => {
    setFoodData({
      food,
    });
  }, [food]);

  return (
    <>
      <section>
        a
      </section>
      <main>
        a
      </main>
      <Footer />
    </>
  );
}

export default Comidas;
