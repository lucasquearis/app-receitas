import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipesMadeCard from './RecipesMadeCard';

class RecipesMadeList extends Component {
  render() {
    const { recipes } = this.props;

    return (
      <div>
        {
          recipes.map(({ image, category, name, tags, doneDate }, i) => (
            <div key={ i }>
              <RecipesMadeCard
                index={ i }
                image={ image }
                category={ category }
                name={ name }
                tags={ tags }
                doneDate={ doneDate }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default RecipesMadeList;

RecipesMadeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
