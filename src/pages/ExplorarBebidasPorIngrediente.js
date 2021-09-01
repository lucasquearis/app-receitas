import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import DrinkImage from '../services/DrinkImage';
import Context from '../context/Context';

function ExplorarBebidasPorIngrediente() {
  const { setExploreIngredient } = React.useContext(Context);
  const [bebidas, setBebidas] = useState([]);
  const MAXLENGHT = 12;
  if (bebidas.length > MAXLENGHT) bebidas.length = MAXLENGHT;
  useEffect(() => {
    const bebidasApi = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const require = await fetch(URL);
      const response = await require.json();
      const acessarBebida = response.drinks;
      setBebidas(acessarBebida);
    };
    bebidasApi();
  }, []);

  const bebidasFiltradasApi = async (obj) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${obj}`;
    const require = await fetch(URL);
    const response = await require.json();
    const acessarBebidaFiltrada = response.drinks;
    setExploreIngredient(acessarBebidaFiltrada);
  };

  return (
    <div>
      <Header>
        Explorar Ingredientes
      </Header>
      <div>
        { bebidas.map((obj, index) => (
          <Link
            key={ index }
            to="/bebidas"
            onClick={ () => bebidasFiltradasApi(obj.strIngredient1) }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ DrinkImage(obj.strIngredient1) }
                alt={ obj.strIngredient1 }
              />
              <h4 data-testid={ `${index}-card-name` }>{obj.strIngredient1}</h4>
            </div>
          </Link>
        )) }
      </div>
      <MenuInferior />
    </div>
  );
}

export default ExplorarBebidasPorIngrediente;
