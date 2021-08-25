import React, { Component } from 'react';

class DetailsFood extends Component {
  render() {
    const { match: { params: { id } } } = this.props;

    return (
      <div> Detalhes da refeição id: { id } </div>
    );
  }
}

export default DetailsFood;
