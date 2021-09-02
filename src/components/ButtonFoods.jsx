import React from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

function ButtonFoods() {
  const { pathname } = useLocation();
  const id = pathname.replace(/([^\d])+/gim, '');
  // const [none, setNone] = useState(false);
  const setHistory = useHistory();

  const handleClick = () => {
    setHistory.push(`/comidas/${id}/in-progress`);
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
