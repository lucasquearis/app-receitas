import React, { Component } from 'react';
import Header from '../../components/Header';

export default class FavoriteFoods extends Component {
  render() {
    return (
      <div>
        <Header title="Receitas Favoritas" showSearchBottom={ false } />
      </div>
    );
  }
}
