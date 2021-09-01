import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function ButtonFoods() {
  const ide = 52771;
  // const [none, setNone] = useState(false);
  const setHistory = useHistory();

  const handleClick = () => {
    setHistory.push(`/comidas/${ide}/in-progress`);
  };

  // useEffect(() => {
  //   const recipe = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (recipe) {
  //     const findRecipe = recipe.find((item) => item.id === ide);
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

export default ButtonFoods;
