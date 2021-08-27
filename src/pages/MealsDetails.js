// import React, { useEffect, useState } from 'react';
// // import { useHistory } from 'react-router-dom';
// import Loading from '../components/Loading';
// import Sugestions from '../components/Sugestions';
// import '../styles/Details.css';

// function MealsDetails() {
//   // const history = useHistory();
//   // const { location: { pathname } } = history;
//   const [recipe, setRecipe] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [lists, setLists] = useState({
//     ingredients: [],
//     measure: [],
//   });
//   const [url, setUrl] = useState();

//   useEffect(() => {
//     const filterIngredients = () => {
//       const keys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
//       const list = keys.map((key) => recipe[key]);
//       const measureQnt = Object.keys(recipe).filter((key) => key.includes('Measure'));
//       const measureList = measureQnt.map((key) => recipe[key]);
//       setLists({
//         ...lists,
//         ingredients: list.filter((item) => item),
//         measure: measureList.filter((item) => item),
//       });
//     };
//     const correctUrl = () => {
//       const ytUrl = recipe.strYoutube;
//       if (ytUrl) setUrl(ytUrl.replace('watch?v=', 'embed/'));
//     };
//     correctUrl();
//     filterIngredients();
//   }, [recipe]);

//   useEffect(() => {
//     try {
//       setLoading(true);
//       const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
//       const fetchRecipe = async () => {
//         const request = await fetch(`${urlFoods}52862`);
//         const response = await request.json();
//         setRecipe(response.meals[0]);
//       };
//       setLoading(false);
//       fetchRecipe();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   if (loading) return <Loading />;
//   return (
//     <section className="details-body">
//       <div className="imagem-container">
//         <img
//           className="imagem"
//           src={ recipe.strMealThumb }
//           data-testid="recipe-photo"
//           alt={ recipe.strMeal }
//         />
//         <div className="infos-container">
//           <h3 className="recipe-title" data-testid="recipe-title">{ recipe.strMeal }</h3>
//           <button
//             classeName="share-btn"
//             data-testid="share-btn"
//             type="button"
//           >
//             share
//           </button>
//           <button
//             classeName="favorite-btn"
//             data-testid="favorite-btn"
//             type="button"
//           >
//             favorite
//           </button>
//         </div>
//         <h4
//           className="recipe-category"
//           data-testid="recipe-category"
//         >
//           { recipe.strCategory }
//         </h4>
//       </div>
//       <div className="ingredients-container">
//         <h3 className="title-ingrendients">Ingredients</h3>
//         <ul className="list">
//           {
//             lists.ingredients.map((item, key) => (
//               <li
//                 key={ key }
//                 data-testid={ `${key}-ingredient-name-and-measure` }
//               >
//                 { `${item} - ${lists.measure[key]}` }
//               </li>
//             ))
//           }
//         </ul>
//       </div>
//       <div className="instructions-container">
//         <h3 className="title-instructions">Instruções</h3>
//         <p
//           data-testid="instructions"
//           className="instructions"
//         >
//           { recipe.strInstructions }
//         </p>
//       </div>
//       <iframe
//         className="recipe-video"
//         data-testid="video"
//         title={ recipe.srtMeal }
//         width="420"
//         height="315"
//         src={ url }
//       />
//       <div className="sugestions">
//         <Sugestions type="drinks" />
//       </div>
//       <button
//         className="iniciar-btn"
//         type="button"
//         data-testid="start-recipe-btn"
//       >
//         Iniciar Receita
//       </button>
//     </section>
//   );
// }

// export default MealsDetails;
