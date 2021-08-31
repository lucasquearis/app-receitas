import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

Video.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Video);
