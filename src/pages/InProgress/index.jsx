import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';

function InProgress() {
  const { pathname } = useLocation();
  let id = pathname.match(/\d/g);
  id = id.join('');
  // https://stackoverflow.com/questions/10003683/how-can-i-extract-a-number-from-a-string-in-javascript

  const [details, setDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [checkedIngredients, setCheckedIngredients] = React.useState({});
  const [isReady, setIsReady] = React.useState(false);

  const query = pathname.includes('comidas') ? 'meal' : 'drink';

  React.useEffect(() => {
    const api = query === 'meal' ? 'themealdb' : 'thecocktaildb';
    const url = `https://www.${api}.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      const filteredData = data[`${query}s`][0];
      setDetails(filteredData);
      setLoading(false);

      Object.entries(filteredData)
        .filter((entry) => entry[0].includes('strIngredient') && entry[1])
        .forEach((ingredient) => {
          setCheckedIngredients((prevState) => ({
            ...prevState,
            [ingredient[1]]: false,
          }));
        });
    };
    fetchData();
  }, [id, query]);

  const src = details[`str${query.charAt(0).toUpperCase() + query.slice(1)}Thumb`];
  const name = details[`str${query.charAt(0).toUpperCase() + query.slice(1)}`];
  const ingredients = Object.entries(details)
    .filter((entry) => entry[0].includes('strIngredient') && entry[1]);

  const handleClick = (ingredient) => {
    setCheckedIngredients((prevState) => ({
      ...prevState,
      [ingredient]: !prevState[ingredient],
    }));
  };

  React.useEffect(() => {
    setIsReady(Object.values(checkedIngredients).every((value) => value));
  }, [checkedIngredients]);

  if (loading) return 'Loading';

  return (
    <div className="p-2 pb-5">
      <img src={ src } alt={ name } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{name}</h2>
      <p data-testid="recipe-category">{details.strCategory}</p>

      <Button data-testid="share-btn" variant="primary" className="mr-1">
        Compartilhar
      </Button>
      <Button data-testid="favorite-btn" variant="primary">
        Favoritar
      </Button>

      {ingredients.map((ingredient, index) => (
        <div key={ ingredient[0] } data-testid={ `${index}-ingredient-step` }>
          <Form.Check
            label={ ingredient[1] }
            checked={ checkedIngredients[ingredient[1]] }
            onChange={ () => handleClick(ingredient[1]) }
            className={ checkedIngredients[ingredient[1]] ? 'checked' : '' }
          />
        </div>
      ))}

      <p data-testid="instructions">{details.strInstructions}</p>

      <Link to="/receitas-feitas">
        <Button
          disabled={ !isReady }
          data-testid="finish-recipe-btn"
          variant="primary"
          className="mb-4"
        >
          Finalizar Receita
        </Button>
      </Link>
    </div>
  );
}

export default InProgress;
