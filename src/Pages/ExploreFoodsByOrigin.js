import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner, Card } from 'react-bootstrap';

function ExploreFoodsByOrigin() {
  const [foods, setFoods] = useState([1]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState('All');
  const [id, setId] = useState('');

  useEffect(() => {
    const apiAreas = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const areasResult = async () => {
      const { meals } = await fetch(apiAreas).then((response) => response.json());
      console.log(meals);
      setAreas(meals);
    };
    areasResult();
  }, [setAreas]);

  useEffect(() => {
    setFoods([]);
    if (area === 'All') {
      const foodsResult = async () => {
        const foodApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const { meals } = await fetch(foodApi).then((response) => response.json());
        setFoods(meals);
      };
      foodsResult();
    } if (area !== 'All') {
      const api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      const foodsResult = async () => {
        const { meals } = await fetch(api).then((response) => response.json());
        setFoods(meals);
      };
      foodsResult();
    }
  }, [area, setFoods]);

  const handleChange = ({ target }) => {
    setArea(target.value);
  };

  const getId = (foodId) => {
    setId(foodId);
  };
  if (id !== '') {
    return <Redirect to={ `/comidas/${id}` } />;
  }
  if (foods.length === 0 || areas.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden"> </span>
      </Spinner>
    );
  }
  return (
    <>
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        {areas.map((ar) => (
          <option
            key={ ar.strArea }
            value={ ar.strArea }
            data-testid={ `${ar.strArea}-option` }
          >
            {ar.strArea}
          </option>
        ))}
        <option
          value="All"
          data-testid="All-option"
          onChange={ handleChange }
        >
          All
        </option>
      </select>
      <section className="main-cards">
        { foods.map((item, index) => {
          const numCards = 12;
          if (index < numCards) {
            return (
              <Card
                data-testid={ `${index}-recipe-card` }
                key={ index }
                className="main-card"
                style={ { width: '8.75rem' } }
                onClick={ () => getId(item.idMeal) }
              >
                <Card.Img
                  data-testid={ `${index}-card-img` }
                  variant="top"
                  src={ item.strMealThumb }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    { item.strMeal }
                  </Card.Title>
                </Card.Body>
              </Card>
            );
          }
          return null;
        }) }
      </section>
    </>
  );
}

export default ExploreFoodsByOrigin;
