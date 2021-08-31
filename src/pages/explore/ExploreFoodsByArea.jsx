import React, { useState, useEffect } from 'react';
import { fetchAreas, fetchByArea, fetchSearchFoodsApi } from '../../services/fetchApi';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import Footer from '../../components/Footer';

export default function ExploreFoodsByArea() {
  const [isMounted, setIsMounted] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectArea, setSelectArea] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const TWELVE = 12;

  const twelveFirst = (getRecipes) => (
    getRecipes.filter((_item, index) => (index < TWELVE)));

  const getInitialState = async () => {
    const getRecipes = await fetchSearchFoodsApi('name', '');
    const getAreas = await fetchAreas();
    setAreas(getAreas);
    setRecipes(twelveFirst(getRecipes));
    setIsMounted(true);
    setIsLoading(false);
  };

  const handleFilter = () => {
    setIsLoading(true);
    const filterRecipes = async () => {
      const getRecipes = selectArea
        ? await fetchByArea(selectArea)
        : await fetchSearchFoodsApi('name', '');
      setRecipes(twelveFirst(getRecipes));
      setIsLoading(false);
    };
    filterRecipes();
  };

  useEffect(handleFilter, [selectArea]);

  useEffect(() => {
    if (!isMounted) getInitialState();
  });

  const setArea = ({ target }) => {
    setSelectArea(target.value);
  };

  return (
    <>
      <Header title="Explorar Origem" showButton foodPage />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ setArea }
      >
        <option
          value=""
          data-testid="All-option"
        >
          All
        </option>
        {areas.map(({ strArea }, index) => (
          <option
            key={ strArea + index }
            value={ strArea }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
      <section>
        {isLoading
          ? <div>Carregando ...</div>
          : recipes.map((recipe, index) => (
            <RecipeCard
              key={ index }
              foodPage
              src={ recipe.strMealThumb }
              name={ recipe.strMeal }
              index={ index }
              alt={ `${recipe.strMeal} image` }
              id={ recipe.idMeal }
            />
          ))}
      </section>
      <Footer />
    </>
  );
}
