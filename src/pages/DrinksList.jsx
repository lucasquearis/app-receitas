import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCocktail } from '../redux/actions';
import HeaderWithSearch from '../components/HeaderWithSearch';
import useCategories from '../hooks/useCategories';
import Footer from '../components/Footer';
import { setLoading } from '../redux/actions/loading';
import useRedirect from '../hooks/useRedirect';

function DrinksList() {
  const { reducerAPI: { loading, cocktails } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [renderedCocktails, setRenderedCocktails] = useState([]);
  const [selected, setSelected] = useState('all');
  const TWELVE = 12;
  const SELECTED_DRINK = 'selected-drink';
  const { shouldRedirect, redirect } = useRedirect();

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
      const newCocktails = [...cocktails.slice(0, TWELVE)];
      setRenderedCocktails(newCocktails);
    }
  }, [cocktails]);

  // if (loading) {
  //   return <h1>Carregando...</h1>;
  // }

  if (cocktails !== null && cocktails.length === 1) {
    return <Redirect to={ `/bebidas/${cocktails[0].idDrink}` } />;
  }

  const handleClickAll = async () => {
    const newCocktails = [...cocktails.slice(0, TWELVE)];
    setRenderedCocktails(newCocktails);
    setSelected('all');
  };

  const handleClick = async (target, name) => {
    dispatch(setLoading(true));
    if (target.className !== SELECTED_DRINK) {
      setSelected(name);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
      const results = await fetch(url).then((response) => response.json());
      const firstTwelve = results.drinks.slice(0, TWELVE);
      setRenderedCocktails(firstTwelve);
    } else {
      setSelected('all');
      handleClickAll();
    }
    dispatch(setLoading(false));
  };

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div>
      <div>
        <HeaderWithSearch>
          Bebidas
        </HeaderWithSearch>

        { catList.map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            onClick={ ({ target }) => handleClick(target, strCategory) }
            data-testid={ `${strCategory}-category-filter` }
            className={ selected === strCategory ? SELECTED_DRINK : 'not-selected' }
          >
            {strCategory}
          </button>
        ))}
        <button
          type="button"
          onClick={ () => handleClickAll() }
          data-testid="All-category-filter"
          className={ selected === 'all' ? SELECTED_DRINK : 'not-selected' }
        >
          All
        </button>
      </div>
      <div className="cards-list">
        { loading ? 'Loading' : renderedCocktails.map((item, index) => (
          <button
            type="button"
            onClick={ () => shouldRedirect(`/bebidas/${item.idDrink}`) }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <img
              alt="drink"
              src={ item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <h4
              data-testid={ `${index}-card-name` }
              className="card-name"
            >
              {item.strDrink}
            </h4>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinksList;
