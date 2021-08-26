import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetailsFood extends Component {
  render() {
    const { match: { params: { id } } } = this.props;

    return (
      <div>
        Detalhes da refeição id:
        { id }
      </div>
    );
  }
}

DetailsFood.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default DetailsFood;
