import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetailsDrink extends Component {
  render() {
    const { match: { params: { id } } } = this.props;

    return (
      <div>
        Detalhes do drink id:
        { id }
      </div>
    );
  }
}

DetailsDrink.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default DetailsDrink;
