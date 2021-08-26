import React from 'react';
// import PropTypes from 'prop-types';

export default function Ingredients({ingredients, index}) {
    // const ingredients = ['1', '2', '3'];
   
  return (
    <section data-testid={`${index}-ingredient-name-and-measure`}>
        <h2>Ingredients</h2>
        
        <ul> 
          <li>exemplo</li>         
            {/* {ingredients.map((ingredient, i)=> (
                <li key={i}>{ingredient[`strIngredient${i}`]}</li>            
                )
            )} */}
        </ul>      
    </section>
  );
}

// Ingredients.propTypes = {
//   name: PropTypes.string.isRequired,
//   img: PropTypes.string.isRequired,
//   aux: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
//   testId: PropTypes.string.isRequired,
// };
