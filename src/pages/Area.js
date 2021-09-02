import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchByArea, fetchFoods, fetchFilterByArea } from '../services/mealAPI';

function Area() {
  const LOCATION = useLocation().pathname;
  const MAX = 12;
  const [area, SetArea] = useState([]);
  const [receitas, setReceitas] = useState();
  const [areaSelected, setAreaSelected] = useState({
    selected: 'All',
  });
  useEffect(() => {
    const GetAreaOrigin = async () => {
      const list = await fetchByArea();
      const { meals } = list;
      const all = { strArea: 'All' };
      SetArea([all, ...meals]);
      const foods = await fetchFoods();
      setReceitas([...foods.meals]);
    };
    GetAreaOrigin();
  }, []);

  useEffect(() => {
    const GetRecipes = async () => {
      if (areaSelected.selected === 'All') {
        const foods = await fetchFoods();
        setReceitas([...foods.meals]);
      } else {
        const list = await fetchFilterByArea(areaSelected.selected);
        const { meals } = list;
        setReceitas([...meals]);
      }
    };
    GetRecipes();
  }, [areaSelected]);

  function handleChange(event) {
    const { value } = event.target;
    setAreaSelected({
      selected: value,
    });
  }
  const ids = 'PageNotFound';
  if (!area || !receitas) return <p>Loading...</p>;
  if (LOCATION === '/explorar/bebidas/area') return <p data-testid={ ids }>Not Found</p>;
  return (
    <div>
      <Header title="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        {
          area.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ index }
            >
              { strArea }
            </option>
          ))
        }
      </select>
      {
        receitas && receitas.slice(0, MAX).map((recipe, index) => (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt="thumbnail recipe"
                width="200"
              />
              <p data-testid={ `${index}-card-name` }>
                { recipe.strMeal }
              </p>
            </div>
          </Link>
        ))
      }
      <Footer />
    </div>
  );
}

export default Area;
