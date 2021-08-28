import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Card } from 'react-bootstrap';
import Context from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Recipes() {
  const {
    requestApiData, apiData, isFetching,
    setRadioValue, setInputText,
  } = React.useContext(Context);

  const [categories, setCategories] = React.useState([]);
  const [loadingCategories, setLoadingCategories] = React.useState(true);
  const [activeFilter, setActiveFilter] = React.useState('');

  const location = useLocation();
  const query = location.pathname === '/comidas' ? 'meal' : 'drink';
  const api = query === 'meal' ? 'themealdb' : 'thecocktaildb';
  const page = query === 'meal' ? 'comidas' : 'bebidas';

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

  React.useEffect(() => {
    requestApiData(api);
  }, [requestApiData, api, location]);

  React.useEffect(() => {
    const fetchCategores = async () => {
      const categoriesUrl = `https://www.${api}.com/api/json/v1/1/list.php?c=list`;

      const res = await fetch(categoriesUrl);
      const data = await res.json();
      setCategories(data);
      setLoadingCategories(false);
    };
    fetchCategores();
  }, [api, location]);

  const recipesSize = 12;
  const catSize = 5;

  if (isFetching || loadingCategories) return 'Loading';

  return (
    <>
      <Header title={ page.charAt(0).toUpperCase() + page.slice(1) } />
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

        <div className="d-flex flex-column align-items-center mt-3">
          {apiData[0][`${query}s`]
            .slice(0, recipesSize).map((item, index) => {
              const name = item[`str${query.charAt(0).toUpperCase() + query.slice(1)}`];
              const src = item[`str${query.charAt(0).toUpperCase()
                + query.slice(1)}Thumb`];
              const id = item[`id${query.charAt(0).toUpperCase() + query.slice(1)}`];
              // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
              return (
                <Link to={ `/${page}/${id}` } key={ id }>
                  <Card
                    data-testid={ `${index}-recipe-card` }
                    style={ { width: '18rem' } }
                  >
                    <Card.Img
                      data-testid={ `${index}-card-img` }
                      src={ src }
                      variant="top"
                    />
                    <Card.Body>
                      <Card.Title
                        data-testid={ `${index}-card-name` }
                      >
                        {name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
        </div>
      </main>
      <Footer handleClick={ setLoadingCategories } />
    </>
  );
}

export default Recipes;
