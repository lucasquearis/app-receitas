import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as ComidasAPI from '../service/ComidasAPI';

// async function insereReceitaAleatoria() {
//   const receita = await ComidasAPI.buscarAleatoria();
//   // const receita = [{ idMeal: '52916' }];
//   console.log(receita);
//   if (receita[0].length <= 0) {
//     return (
//       <p>Loading...</p>
//     );
//   }
//   return (
//   );
// }
export default function ExplorarComidas() {
  const [receita, setreceita] = useState([]);

  useEffect(() => {
    const pegarComida = async () => {
      const result = await ComidasAPI.buscarAleatoria();      
      setreceita(result);
    };
    pegarComida();
  }, []);
  console.log(receita);
  return (
    <main>
      <section>
        <Header title="ExplorarComidas" searchIcon />
      </section>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button">
          <h1 data-testid="explore-by-ingredient">
            Por Ingredientes
          </h1>
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button">
          <h1 data-testid="explore-by-area">
            Por Local de Origem
          </h1>
        </button>
      </Link>
      {/* <Link to={ `/comidas/${receita[0].idMeal}` }>
        <button type="button">
          <h1 data-testid="explore-surprise">
            Me Surpreenda!
          </h1>
        </button>
      </Link> */}
      <Footer />
    </main>
  );
}
