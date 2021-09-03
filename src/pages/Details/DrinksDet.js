import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import 'bootstrap/dist/css/bootstrap.css';
// // import { useParams, Link } from 'react-router-dom';
// import { Image } from 'react-bootstrap';
// import ShareButton from '../../components/ShareButton';
// import FavoriteButton from '../../components/FavoriteButton';

// const responsive = {
//   mobile: {
//     breakpoint: { max: 360, min: 0 },
//     items: 2,
//   },
// };

function DrinksDetails() {
  // const [recipesDrink, setRecipesDrink] = useState([{}]);
  // const [ingredients, setIngredients] = useState([]);
  // const [measure, setMeasure] = useState([]);
  // const [recipesRecommendations, setRecipesRecommendations] = useState([]);
  // const [doneRecipes, setDoneRecipes] = useState([]);
  // const [inProgress, setInProgress] = useState([]);
  // const { id } = useParams();

  // useEffect(() => {
  //   const getRecipesDrink = async () => {
  //     const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  //     const { drinks } = await fetch(endpoint).then((data) => data.json());
  //     setRecipesDrink(drinks);
  //   };
  //   getRecipesDrink();
  // }, [id]);

  // useEffect(() => {
  //   const getIngredientsAndMeasures = () => {
  //     const key = Object.keys(recipesDrink[0])
  //       .filter((item) => item.includes('strIngredient'));
  //     const ingredientNotEmpty = key
  //       .filter((item) => (
  //         recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null));
  //     const ingredientsList = ingredientNotEmpty
  //       .map((keyDrink) => recipesDrink[0][keyDrink]);
  //     setIngredients(ingredientsList);

  //     const keyMeasure = Object.keys(recipesDrink[0])
  //       .filter((item) => item.includes('strMeasure'));
  //     const measureNoEmpty = keyMeasure
  //       .filter((item) => (
  //         recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null));
  //     const measureList = measureNoEmpty.map((kMeasure) => recipesDrink[0][kMeasure]);
  //     setMeasure(measureList);
  //   };
  //   getIngredientsAndMeasures();
  // }, [recipesDrink]);

  // useEffect(() => {
  //   const getRecommendations = async () => {
  //     const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //     const { meals } = await fetch(endpoint).then((data) => data.json());
  //     const maxRecommendations = 5;
  //     const recommendationList = [];
  //     for (let index = 0; index <= maxRecommendations; index += 1) {
  //       recommendationList.push(meals[index]);
  //     }
  //     setRecipesRecommendations(recommendationList);
  //   };
  //   getRecommendations();
  // }, []);

  // useEffect(() => {
  //   const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const filterDoneRecipes = getDoneRecipes ? getDoneRecipes
  //     .filter((item) => item.id === id) : [];
  //   setDoneRecipes(filterDoneRecipes);

  //   const getInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const filterInProgress = getInProgress ? Object.keys(getInProgress.cocktails)
  //     .filter((item) => item === id) : [];
  //   setInProgress(filterInProgress);
  // }, [id, setDoneRecipes]);

  return (
    <div>
      <h1>Drinks Details</h1>
      {/* { recipesDrink !== undefined ? recipesDrink.map((item, index) => (
        <div key={ index }>
          <Image
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt="receita pronta"
            fluid
          />
          <h2 data-testid="recipe-title">{ item.strDrink }</h2>
          <p data-testid="recipe-category">{ item.strAlcoholic }</p>
          <ShareButton />
          <FavoriteButton
            infos={ {
              id,
              type: 'bebida',
              area: '',
              category: item.strCategory,
              alcoholicOrNot: item.strAlcoholic,
              name: item.strDrink,
              image: item.strDrinkThumb,
              // doneDate: '',
              // tags: [],
            } }
          />
          <div>
            <h3>Ingredientes</h3>
            <ul>
              { ingredients.map((ingredient, indx) => (
                <li
                  key={ indx }
                  data-testid={ `${indx}-ingredient-name-and-measure` }
                >
                  { `${measure[indx]} ${ingredient}` }

                </li>
              )) }
            </ul>
          </div>
          <p data-testid="instructions">{ item.strInstructions }</p>
          <Carousel responsive={ responsive } slidesToSlide={ 2 }>
            { recipesRecommendations.map((food, ind) => (
              <div key={ food.strMeal } data-testid={ `${ind}-recomendation-card` }>
                <h2 data-testid={ `${ind}-recomendation-title` }>{food.strMeal }</h2>
                <Image src={ food.strMealThumb } alt={ food.strMeal } fluid />
              </div>
            )) }
          </Carousel>
          <Link to={ `/bebidas/${id}/in-progress` }>
            <button
              type="button"
              style={ { position: 'fixed', bottom: 0 } }
              data-testid="start-recipe-btn"
              hidden={ doneRecipes.length !== 0 }
            >
              { inProgress.length !== 0
                ? 'Continuar Receita' : 'Iniciar Receita' }
            </button>
          </Link>
        </div>
      )) : <p>Loading...</p> } */}
    </div>
  );
}

export default DrinksDetails;
