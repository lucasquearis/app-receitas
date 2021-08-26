import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Ingredients.css';
import fetchFoods from '../fetchs/FetchFood';
import MyContext from '../context/MyContext';

function BebidasIng() {
  const { setFilterByIng } = useContext(MyContext);
  const [ingredients, setIngredients] = useState();
  const [redirect, setRedirect] = useState({
    redirect: false,
    path: '',
  });
  const getDrinks = async () => {
    const list = await fetchFoods('drink', 'ingredients');
    console.log(list);
    const { drinks } = list;
    console.log(drinks);
    const limitator = 12;
    const drinkList = drinks.filter((drink, index) => index < limitator);
    setIngredients(drinkList);
  };

  function onClick(event) {
    const { name } = event.target;
    event.preventDefault();
    setRedirect({
      redirect: true,
      path: name,
    });
    setFilterByIng({
      ingredient: name,
    });
  }

  useEffect(() => {
    getDrinks();
  }, []);

  console.log(ingredients);
  if (redirect.redirect) return <Redirect to="/Bebidas" />;
  if (!ingredients) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Ingredientes" />
      <main className="div">
        { ingredients.map(({ strIngredient1 }, index) => (
          <Card
            data-testid={ `${index}-ingredient-card` }
            style={ { width: '18rem' } }
            name={ strIngredient1 }
            key={ index }
            onClick={ onClick }
          >
            <Card.Img
              data-testid={ `${index}-card-img` }
              variant="top"
              name={ strIngredient1 }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-card-name` }
                name={ strIngredient1 }
              >
                { strIngredient1 }
              </Card.Title>
            </Card.Body>
          </Card>
        )) }
      </main>
      <Footer />
    </div>
  );
}

export default BebidasIng;
