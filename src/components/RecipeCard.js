import React from 'react';
import { string } from 'prop-types';

function RecipeCard(props) {
  const { thumb, title } = props;
  return (
    <li>
      <h2>
        { title }
      </h2>
      <img src={ thumb } alt="Recipe" />
    </li>
  );
}

RecipeCard.propTypes = {
  thumb: string.isRequired,
  title: string.isRequired,
};

export default RecipeCard;
