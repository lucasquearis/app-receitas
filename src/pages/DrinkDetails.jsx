// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
// import copy from 'clipboard-copy';
// import Loading from '../components/Loading';
// import Sugestions from '../components/Sugestions';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';

// function DrinkDetails(props) {
//   const { history } = props;
//   const location = useLocation();
//   const params = useParams();
//   const [recipe, setRecipe] = useState({});
//   const [favorite, setFavorite] = useState(false);
//   const [share, setShare] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [lists, setLists] = useState({
//     ingredients: [],
//     measure: [],
//   });

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

//     filterIngredients();
//   }, [recipe]);

//   useEffect(() => {
//     try {
//       setLoading(true);
//       const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
//       const fetchRecipe = async () => {
//         const request = await fetch(`${urlDrinks}${params.id}`); // colocar o id dinânmico
//         const response = await request.json();
//         setRecipe(response.drinks[0]);
//       };
//       setLoading(false);
//       fetchRecipe();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   if (loading) return <Loading />;

//   const checkIsFavorite = () => (
//     favorite ? { blackHeartIcon } : { whiteHeartIcon });

//   const handleFavorite = () => setFavorite((previus) => !previus);

//   const handleClickProgress = (e) => {
//     e.preventDefault();
//     return history.push(`/bebidas/${params.id}/in-progress`);
//   };

//   return (
//     <section>
//       <div>
//         <img
//           width="250"
//           height="200"
//           src={ recipe.strDrinkThumb }
//           data-testid="recipe-photo"
//           alt={ recipe.strDrink }
//         />
//         <div>
//           <h2 data-testid="recipe-title">{ recipe.strDrink }</h2>
//         </div>
//         <div>
//           <button
//             onClick={ () => {
//               copy(`http://localhost:3000${location.pathname}`);
//               setShare(true);
//             } }
//             data-testid="share-btn"
//             type="button"
//           >
//             <img src={ shareIcon } alt="Share Icon" />
//           </button>
//           { share && <p>Link copiado!</p> }
//           <button
//             onClick={ handleFavorite }
//             data-testid="favorite-btn"
//             type="button"
//           >
//             <img src={ checkIsFavorite } alt="Botão Favoritar" />
//           </button>
//         </div>
//         <h4 data-testid="recipe-category">{ recipe.strAlcoholic }</h4>
//       </div>
//       <div>
//         <h3>Ingredients</h3>
//         <ul>
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
//       <div>
//         <h3>Instruções</h3>
//         <p data-testid="instructions">{ recipe.strInstructions }</p>
//       </div>
//       <div>
//         <Sugestions type="meals" />
//       </div>
//       <button
//         onClick={ (e) => handleClickProgress(e) }
//         style={ { position: 'fixed', bottom: '0px' } }
//         type="button"
//         data-testid="start-recipe-btn"
//       >
//         Iniciar Receita
//       </button>
//     </section>
//   );
// }

// DrinkDetails.propTypes = {
//   history: objectOf(oneOfType([func, string, number, object])).isRequired,
// };

// export default DrinkDetails;
