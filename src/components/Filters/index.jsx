import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';
import Button from './button';

function Filters({ title, title2 }) {
  const { filters, getRecipes } = useContext(RecipesContext);
  return (
    <div>
      {
        title2 === 'area' ? <h1>Dale</h1>
          : filters[title.toLowerCase()]
            .map((e, index) => (
              <Button
                prefix={ title.toLowerCase() }
                key={ e.strCategory }
                name={ e.strCategory }
                index={ index }
              />
            ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => getRecipes(null, null, title.toLowerCase()) }
      >
        All
      </button>
    </div>
  );
}

Filters.propTypes = {
  title: PropTypes.string,
  title2: PropTypes.string,
};

Filters.defaultProps = {
  title: undefined,
  title2: undefined,
};

export default Filters;
