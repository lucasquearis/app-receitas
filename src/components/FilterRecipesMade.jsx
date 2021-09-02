import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/categoryStyle.css';

class FilterRecipesMade extends Component {
  render() {
    const { handleClick, categories } = this.props;

    return (
      <div className="categoryStyle">
        <button
          type="button"
          onClick={ handleClick }
          className="btn btn-warning"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        {
          categories.map(({ strCategory, strName }) => (
            <button
              type="button"
              key={ strCategory }
              onClick={ handleClick }
              className="btn btn-warning"
              data-testid={ `filter-by-${strCategory}-btn` }
            >
              { strName }
            </button>
          ))
        }
      </div>
    );
  }
}

FilterRecipesMade.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default FilterRecipesMade;
