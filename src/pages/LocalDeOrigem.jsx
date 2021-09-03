import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';
import mainFetch from '../fetchs/mainFetch';
import CardList from '../components/CardList';

function LocalDeOrigem() {
  const [area, setArea] = useState([]);
  const [receitas, setReceitas] = useState();
  const [areaSelected, setAreaSelected] = useState({
    selected: 'All',
  });

  const getLocalOrigem = async () => {
    const list = await mainFetch('food', 'area');
    const { meals } = list;
    const all = { strArea: 'All' };
    setArea([all, ...meals]);
    const receitasList = await mainFetch('food', 'procuraComida');
    setReceitas([...receitasList.meals]);
  };

  useEffect(() => {
    getLocalOrigem();
  }, []);

  useEffect(() => {
    const getReceitas = async () => {
      if (areaSelected.selected === 'All') {
        const list = await mainFetch('food', 'procuraComida');
        const { meals } = list;
        setReceitas([...meals]);
      } else {
        const list = await mainFetch('food', 'filterByArea', areaSelected.selected);
        const { meals } = list;
        setReceitas([...meals]);
      }
    };
    getReceitas();
  }, [areaSelected]);

  function handleChange(event) {
    const { value } = event.target;
    setAreaSelected({
      selected: value,
    });
  }

  console.log(receitas);
  if (!area) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Origem" pesquisa="true" />
      <main className="pageComida">
        <select
          className="select-area"
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
        >
          { area.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ index }
            >
              { strArea }
            </option>
          ))}
        </select>
        <CardList
          list={ receitas }
          apiType="Meal"
          page="comidas"
        />
      </main>
      <Footer />
    </div>
  );
}

export default LocalDeOrigem;
