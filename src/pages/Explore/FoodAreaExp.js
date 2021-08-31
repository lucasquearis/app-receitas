import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import MenuInferior from '../../components/MenuInferior';
import Recipes from '../../components/Recipes';
import FoodCard from '../../components/FoodCard';
import Context from '../../context/Context';

export default function FoodAreaExp() {
  const { requestAreas, requestFoodByName, requestFoodByAreas } = useContext(Context);
  const [areas, setAreas] = useState([]);
  const [areaLoading, setAreaLoading] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('All');
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getAreas = async () => {
      const response = await requestAreas();
      setAreas(response);
      setAreaLoading(false);
    };
    getAreas();
  }, []);

  useEffect(() => {
    const filterSwitch = async () => {
      setAreaLoading(true);
      if (selectedArea === 'All') {
        const response = await requestFoodByName('');
        setFoods(response);
        setLoading(false);
        setAreaLoading(false);
      } else {
        const response = await requestFoodByAreas(selectedArea);
        setFoods(response);
        setLoading(false);
        setAreaLoading(false);
      }
    };
    filterSwitch();
  }, [selectedArea]);

  if (areaLoading) return <p>Loading...</p>;

  const cards = [];
  for (let index = 0; index < foods.length; index += 1) {
    cards.push(<FoodCard meal={ foods[index] } index={ index } />);
  }
  const maxCards = 11;

  const foodPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Explorar Origem" name="meal" search />
          <select
            data-testid="explore-by-area-dropdown"
            value={ selectedArea }
            onChange={ ({ target: { value } }) => setSelectedArea(value) }
          >
            <option data-testid="All-option">All</option>
            {
              areas.map(({ strArea }) => (
                <option
                  key={ `${strArea}-select-option` }
                  data-testid={ `${strArea}-option` }
                >
                  { strArea }
                </option>
              ))
            }
          </select>
          { cards.filter((e, index) => index <= maxCards) }
          <Recipes />
          <MenuInferior />
        </div>
      );
    }
  };

  return (
    <main>
      { foodPage(loading) }
    </main>
  );
}
