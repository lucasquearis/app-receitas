import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCocktail } from '../redux/actions';
import HeaderWithSearch from '../components/HeaderWithSearch';
import useCategories from '../hooks/useCategories';
import Footer from '../components/Footer';
import { setLoading } from '../redux/actions/loading';

function DrinksList() {
  const { reducerAPI: { loading, cocktails } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [renderedCocktails, setRenderedCocktails] = useState([]);

  useEffect(() => {
    dispatch(getCocktail());
  }, [dispatch]);

  const [catList, setCatList] = useState([]);
  const CATURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const categories = useCategories(CATURL, 'drinks');

  useEffect(() => setCatList(categories), [categories]);

  useEffect(() => {
    if (cocktails === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (cocktails !== null && cocktails.length > 1) {
      const TWELVE = 12;
      const newCocktails = [...cocktails.slice(0, TWELVE)];
      setRenderedCocktails(newCocktails);
    }
  }, [cocktails]);

  if (loading) {
    return <h1>Carregando...</h1>;
  }
  if (cocktails !== null && cocktails.length === 1) {
    return <Redirect to={ `/bebidas/${cocktails[0].idDrink}` } />;
  }

  const handleClick = async (name) => {
    dispatch(setLoading(true));
    const TWELVE = 12;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
    const results = await fetch(url).then((response) => response.json());
    const firstTwelve = results.drinks.slice(0, TWELVE);
    setRenderedCocktails(firstTwelve);
    dispatch(setLoading(false));
  };

  const handleClickAll = async () => {
    const TWELVE = 12;
    const newCocktails = [...cocktails.slice(0, TWELVE)];
    setRenderedCocktails(newCocktails);
  };

  return (
    <div>
      <div>
        <HeaderWithSearch>
          Bebidas
        </HeaderWithSearch>

        { catList.map((category, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => handleClick(category.strCategory) }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          type="button"
          onClick={ () => handleClickAll() }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      { renderedCocktails.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            alt="drink"
            src={ item.strDrinkThumb }
            data-testid={ `${index}-card-img` }
          />
          <h4 data-testid={ `${index}-card-name` }>{item.strDrink}</h4>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default DrinksList;
