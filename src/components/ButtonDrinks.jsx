import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function ButtonDrinks() {
  const ido = 178319;
  // const [none, setNone] = useState(false);
  const setHistory = useHistory();

  const handleClick = () => {
    setHistory.push(`/bebidas/${ido}/in-progress`);
  };

  // useEffect(() => {
  //   const recipe = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (recipe) {
  //     const findRecipe = recipe.find((item) => item.id === ido);
  //     if (findRecipe) setNone(true);
  //   }
  // }, []);

  return (
    <div className="div-button-details">
      <button
        hidden={ false }
        className="button-details"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        Iniciar Receita
        {/* {inProgress ? 'Continuar Receita' : 'Iniciar Receita'} */}
      </button>
    </div>
  );
}

export default ButtonDrinks;
