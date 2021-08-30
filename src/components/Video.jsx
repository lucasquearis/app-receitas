import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipe from '../Redux/actions/fetchRecipes';

class Video extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <section>
        {
          recipe.map(({ strYoutube }, index) => (
            <iframe
              key={ index }
              src={ strYoutube }
              title="recipe video"
              data-testid="video"
            />
          ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipe(id)),
});

Video.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Video);
