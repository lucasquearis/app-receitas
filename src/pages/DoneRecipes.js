import React /* , { useEffect }  */ from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './DoneRecipes.css';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
// import Context from '../context/Context';

function FoodAreaExp() {
  // const doneRecipes = [
  //   {
  //     id: '52771',
  //     type: 'comida',
  //     area: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image:
  //       'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '23/06/2020',
  //     tags: ['Pasta', 'Curry'],
  //   },
  //   {
  //     id: '178319',
  //     type: 'bebida',
  //     area: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image:
  //       'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     doneDate: '23/06/2020',
  //     tags: [],
  //   },
  // ];

  const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  console.log(doneRecipesLocalStorage);
  // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  // const [copy, setCopy] = useState("");

  // const resultLOcal = JSON.parse(localStorage.getItem('doneRecipes'));
  const copyReipes = () => {
    alert('Link copiado!');
  };

  // const rotaBtn = () => {
  //   alert('clickado');
  //   // if (doneRecipes.type === "comida") {
  //   //   alert("comida");
  //   // } else if (doneRecipes.type === "bebida") {
  //   //   alert("bebida");
  //   // }
  // };

  return (
    <div>
      <Header name="Receitas Feitas" search={ false } />
      <h2>Receitas Feitas</h2>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button" /*  onClick={ rotaBtn } */
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          /* onClick={ rotaBtn } */
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          /*      onClick={ rotaBtn } */
        >
          Drinks
        </button>
      </div>

      <div>
        {doneRecipesLocalStorage.map((item, index) => (
          <article className="article-cards" key={ item.id }>
            <div className="div-img">
              <img
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                width="150px"
                alt={ item.name }
              />
            </div>

            <div className="container-info">
              <h4 data-testid={ `${index}-horizontal-name` }>{item.name}</h4>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${item.area} - ${item.category}-${item.alcoholicOrNot}`}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {item.doneDate}
              </p>

              {item.tags.map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
              {/* <CopyToClipboard text = {}>
                </CopyToClipboard>  */}
              <button
                className="img-compartilhar"
                type="button"
                onClick={ copyReipes }
              >
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="compartilhar"
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FoodAreaExp;
