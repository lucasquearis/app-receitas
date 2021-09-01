import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import FoodContext from '../context/FoodContext';
import { fetchMealByName, fetchMealByAreaName } from '../services/fetchMealApi';

const SearchByOrigin = () => {
  const { areas, foods, setFoods } = useContext(FoodContext);
  const [areaValue, setAreaValue] = useState('All');
  const [showBar, setShowBar] = useState(false);
  const RECIPES = 12;

  const handleChange = ({ target: { value } }) => {
    setAreaValue(value);
  };

  useEffect(() => {
    const filterRecipes = async () => {
      if (areaValue === 'All') {
        const response = await fetchMealByName('');
        setFoods(response);
      } else {
        const response = await fetchMealByAreaName(areaValue);
        setFoods(response);
      }
    };
    filterRecipes();
  }, [areaValue, setFoods]);

  return (
    <div>
      <header>

        <Link to="/perfil">
          <button type="button">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </button>
        </Link>
        <p data-testid="page-title">Explorar Origem</p>
      </header>
      <button onClick={ () => setShowBar(!showBar) } type="button">
        <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
      </button>
      <select onChange={ handleChange } data-testid="explore-by-area-dropdown">
        <option data-testid="All-option" value="All">All</option>
        {areas.map(({ strArea }, index) => (
          <option
            value={ strArea }
            key={ index }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
      <div className="recipe-container">
        {foods && foods.slice(0, RECIPES)
          .map((recipe, index) => (
            <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
              <div
                className="recipe-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ recipe.strMealThumb }
                  alt="recipe"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
              </div>
            </Link>
          ))}
      </div>
      <FooterMenu />
    </div>
  );
};

export default SearchByOrigin;
