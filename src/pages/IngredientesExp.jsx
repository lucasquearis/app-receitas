import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Ingredients.css';
import fetchFoods from '../fetchs/FetchFood';

function IngredientesComida() {
  const [ingredients, setIngredients] = useState();

  const getIngredients = async () => {
    const list = await fetchFoods('food', 'ingredients');
    setIngredients(list);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  console.log(ingredients);
  if (!ingredients) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Comidas" />
      <main className="div">
        <Card
          data-testid="${index}-ingredient-card"
          style={ { width: '18rem' } }
        >
          <Card.Img
            data-testid="${index}-card-img"
            variant="top"
            src="holder.js/100px180"
          />
          <Card.Body>
            <Card.Title 
              data-testid="${index}-card-name"
            >
              Card Title
            </Card.Title>
            <Card.Text>
              FOOD
            </Card.Text>
          </Card.Body>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default IngredientesComida;
