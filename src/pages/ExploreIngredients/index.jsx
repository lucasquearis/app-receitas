import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreIngredients() {
  const { pathname } = useLocation();
  const query = pathname.includes('comidas') ? 'meal' : 'drink';
  const api = query === 'meal' ? 'themealdb' : 'thecocktaildb';

  const [ingredients, setIngredients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = `https://www.${api}.com/api/json/v1/1/list.php?i=list`;
    const fetchIngredients = async () => {
      const res = await fetch(url);
      const data = await res.json();
      const ingredientsSize = 12;
      const filteredData = data[`${query}s`].slice(0, ingredientsSize);
      setIngredients(filteredData);
      setLoading(false);
    };
    fetchIngredients();
  }, [query, api]);

  if (loading) return 'Loading';

  return (
    <>
      <Header
        title="Explorar Ingredientes"
        renderSearchIcon={ false }
      />
      <main className="d-flex flex-column align-items-center">
        {ingredients.map((ingredient, index) => {
          const name = query === 'meal' ? 'strIngredient' : 'strIngredient1';

          return (
            <Link
              key={ ingredient[name] }
              to={ {
                pathname: query === 'meal' ? '/comidas' : '/bebidas',
                state: {
                  ingredient: ingredient[name],
                },
              } }
            >
              <Card
                data-testid={ `${index}-ingredient-card` }
                style={ { width: '18rem' } }
              >
                <Card.Img
                  data-testid={ `${index}-card-img` }
                  variant="top"
                  src={ `https://www.${api}.com/images/ingredients/${ingredient[name]}-Small.png` }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {ingredient[name]}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
        <Footer />
      </main>
    </>
  );
}

export default ExploreIngredients;
