import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Ingredients.css';
import fetchFoods from '../fetchs/FetchFood';

function IngredientesComida() {
  const [ingredients, setIngredients] = useState();
  const [redirect, setRedirect] = useState({
    redirect: false,
    path: '',
  });
  const getIngredients = async () => {
    const list = await fetchFoods('food', 'ingredients');
    const { meals } = list;
    const limitator = 12;
    const foods = meals.filter((food, index) => index < limitator);
    setIngredients(foods);
  };

  function onClick(event) {
    const { name } = event.target;
    event.preventDefault();
    setRedirect({
      redirect: true,
      path: name,
    });
  }

  useEffect(() => {
    getIngredients();
  }, []);

  console.log(ingredients);
  if (redirect.redirect) return <Redirect to={ `/Comidas/${redirect.path}` } />;
  if (!ingredients) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Comidas" />
      <main className="div">
        { ingredients.map(({ idIngredient, strIngredient }, index) => (
          <Card
            data-testid={ `${index}-ingredient-card` }
            name={ idIngredient }
            style={ { width: '18rem' } }
            key={ index }
            onClick={ onClick }
          >
            <Card.Img
              data-testid={ `${index}-card-img` }
              variant="top"
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}.png` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-card-name` }
              >
                { strIngredient }
              </Card.Title>
            </Card.Body>
          </Card>
        )) }
      </main>
      <Footer />
    </div>
  );
}

export default IngredientesComida;
