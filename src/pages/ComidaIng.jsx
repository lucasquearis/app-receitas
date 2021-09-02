import React, { useEffect, useState, useContext } from 'react';
/* import Card from 'react-bootstrap/Card'; */
import { Redirect } from 'react-router-dom';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchFoods from '../fetchs/FetchFood';
import MyContext from '../context/MyContext';

function ComidaIng() {
  const { setFilterByIng } = useContext(MyContext);
  const [ingredients, setIngredients] = useState();
  const [redirect, setRedirect] = useState({
    redirect: false,
  });
  const getIngredients = async () => {
    const list = await fetchFoods('food', 'ingredients');
    const { meals } = list;
    const limitator = 12;
    const foods = meals.filter((food, index) => index < limitator);
    setIngredients(foods);
  };

  const getFoodById = async (ingredient) => {
    const list = await fetchFoods('food', 'filterIngredient', ingredient);
    setFilterByIng({
      ...list,
    });
  };

  function onClick(event) {
    const { name } = event.target;
    setRedirect({
      redirect: true,
    });
    getFoodById(name);
  }

  useEffect(() => {
    getIngredients();
  }, []);

  if (redirect.redirect) return <Redirect to="/comidas" />;
  if (!ingredients) return <p>Loading...</p>;
  return (
    <div className="pageComida">
      <Header titulo="Explorar Ingredientes" />
      <main>
        <div>
          <CardList
            list={ ingredients }
            apiType="Ingredient"
            page="comidas"
            onClick={ onClick }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ComidaIng;
