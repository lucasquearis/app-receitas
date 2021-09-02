import React from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

function ButtonDrinks() {
  const { pathname } = useLocation();
  const id = pathname.replace(/([^\d])+/gim, '');
  // const [none, setNone] = useState(false);
  const setHistory = useHistory();

  const handleClick = () => {
    setHistory.push(`/bebidas/${id}/in-progress`);
  };
  // testando
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
