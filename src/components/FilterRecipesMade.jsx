import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/categoryStyle.css';

class FilterRecipesMade extends Component {
  render() {
    const { handleClick, categories } = this.props;

    return (
      <div className="categoryStyle">
        <button
          className="btn btn-warning "
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
        >
          All
        </button>
        {
          categories.map(({ strCategory, strName }) => (
            <button
              className="btn btn-warning "
              key={ strCategory }
              type="button"
              data-testid={ `filter-by-${strCategory}-btn` }
              onClick={ handleClick }
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
