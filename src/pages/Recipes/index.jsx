import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import Context from '../../context';
import Footer from '../../components/Footer';

function Recipes(props) {
  const {
    requestApiData, apiData, isFetching,
    setRadioValue, setInputText,
  } = React.useContext(Context);

  const [categories, setCategories] = React.useState([]);
  const [loadingCategories, setLoadingCategories] = React.useState(true);
  const [activeFilter, setActiveFilter] = React.useState('');

  const handleRemoveFilter = () => {
    setRadioValue('s');
    setInputText('');
  };

  const handleFilter = ({ target }) => {
    if (target.innerHTML === activeFilter) {
      handleRemoveFilter();
      setActiveFilter('');
    } else {
      setRadioValue('c');
      setInputText(target.innerHTML);
      setActiveFilter(target.innerHTML);
    }
  };

  const { location: { pathname } } = props;
  const query = pathname === '/comidas' ? 'meal' : 'drink';

  React.useEffect(() => {
    const url = query === 'meal' ? 'themealdb' : 'thecocktaildb';
    requestApiData(url);
  }, [requestApiData, query]);

  React.useEffect(() => {
    const fetchCategores = async () => {
      const api = query === 'meal' ? 'themealdb' : 'thecocktaildb';
      const categoriesUrl = `https://www.${api}.com/api/json/v1/1/list.php?c=list`;

      const res = await fetch(categoriesUrl);
      const data = await res.json();
      setCategories(data);
      setLoadingCategories(false);
    };
    fetchCategores();
  }, [query]);

  const recipesSize = 12;
  const catSize = 5;

  if (isFetching || loadingCategories) return 'Loading';

  return (
    <>
      <main className="p-2">
        <Button
          type="button"
          onClick={ handleRemoveFilter }
          data-testid="All-category-filter"
          className="mb-1 mr-1"
          variant="primary"
        >
          All
        </Button>
        {categories[`${query}s`]
          .slice(0, catSize).map((cat) => (
            <Button
              key={ cat.strCategory }
              onClick={ handleFilter }
              type="button"
              data-testid={ `${cat.strCategory}-category-filter` }
              variant="primary"
              className="mb-1 mr-1"
            >
              {cat.strCategory}
            </Button>
          ))}

        {apiData[0][`${query}s`]
          .slice(0, recipesSize).map((item, index) => {
            const name = item[`str${query.charAt(0).toUpperCase() + query.slice(1)}`];
            const src = item[`str${query.charAt(0).toUpperCase() + query.slice(1)}Thumb`];
            const id = item[`id${query.charAt(0).toUpperCase() + query.slice(1)}`];
            const subpage = query === 'meal' ? 'comidas' : 'bebidas';

            return (
              <Link to={ `/${subpage}/${id}` } key={ id }>
                <div data-testid={ `${index}-recipe-card` }>
                  <h3 data-testid={ `${index}-card-name` }>{name}</h3>
                  <img
                    src={ src }
                    alt={ name }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              </Link>
            );
          })}
      </main>
      <Footer handleClick={ setLoadingCategories } />
    </>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Recipes;
