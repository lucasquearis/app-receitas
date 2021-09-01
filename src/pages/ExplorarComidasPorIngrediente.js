import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import FoodImage from '../services/FoodImage';

function ExplorarComidasPorIngrediente() {
  const [comidas, setComidas] = useState([]);
  const { setExploreIngredient } = React.useContext(Context);
  const MAXLENGHT = 12;
  if (comidas.length > MAXLENGHT) comidas.length = MAXLENGHT;
  useEffect(() => {
    const comidasApi = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const require = await fetch(URL);
      const response = await require.json();
      const acessarComida = response.meals;
      setComidas(acessarComida);
    };
    comidasApi();
  }, []);

  const comidasFiltradasApi = async (obj) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${obj}`;
    const require = await fetch(URL);
    const response = await require.json();
    const acessarComidaFiltrada = response.meals;
    setExploreIngredient(acessarComidaFiltrada);
  };

  return (
    <div>
      <Header>
        Explorar Ingredientes
      </Header>
      <div>
        { comidas.map((obj, index) => (
          <Link
            key={ index }
            to="/comidas"
            onClick={ () => comidasFiltradasApi(obj.strIngredient) }
          >
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <label
                htmlFor={ `${index}-card-img` }
              >

                <img
                  data-testid={ `${index}-card-img` }
                  src={ FoodImage(obj.strIngredient) }
                  alt={ obj.strIngredient }
                />
                <h4 data-testid={ `${index}-card-name` }>{obj.strIngredient}</h4>
              </label>
            </div>
          </Link>
        )) }
      </div>
      <MenuInferior />
    </div>
  );
}

export default ExplorarComidasPorIngrediente;
