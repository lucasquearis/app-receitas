import React, { Component } from 'react';

class DetailsDrink extends Component {
  render() {
    const { match: { params: { id } } } = this.props;

    return (
      <div> Detalhes do drink id: { id } </div>
    );
  }
}

export default DetailsDrink;
