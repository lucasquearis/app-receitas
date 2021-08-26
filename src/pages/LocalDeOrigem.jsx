import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';
import fetchFoods from '../fetchs/FetchFood';
import CardList from '../components/CardList';

function LocalDeOrigem() {
  const [area, setArea] = useState([]);
  const [receitas, setReceitas] = useState();
  const [areaSelected, setAreaSelected] = useState({
    selected: 'All',
  });

  const getLocalOrigem = async () => {
    const list = await fetchFoods('food', 'area');
    const { meals } = list;
    const all = { strArea: 'All' };
    setArea([...meals, all]);
    const receitasList = await fetchFoods('food', 'procuraComida');
    setReceitas([...receitasList.meals]);
  };

  useEffect(() => {
    getLocalOrigem();
  }, []);

  useEffect(() => {
    const getReceitas = async () => {
      if (areaSelected.selected === 'All') {
        const list = await fetchFoods('food', 'procuraComida');
        const { meals } = list;
        console.log(meals);
        setReceitas([...meals]);
      } else {
        const list = await fetchFoods('food', 'filterByArea', areaSelected.selected);
        const { meals } = list;
        console.log(meals);
        setReceitas([...meals]);
      }
    };
    getReceitas();
  }, [areaSelected]);

  function onClick(event) {
    const { name } = event.target;
    event.preventDefault();
    setAreaSelected({
      selected: name,
    });
  }

  if (!area) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Origem" />
      <main className="origem">
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            { areaSelected.selected }
          </Dropdown.Toggle>
          <Dropdown.Menu data-testid="explore-by-area-dropdown">
            { area.map(({ strArea }, index) => (
              <Dropdown.Item
                data-testid={ `${strArea}-option` }
                name={ strArea }
                href="#"
                key={ index }
                onClick={ onClick }
              >
                { strArea }
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
