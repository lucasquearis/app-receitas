import React, { Component } from 'react';
import MenuFooter from '../../../components/MenuFooter';
import Header from '../../../components/Header';

export default class ComidasArea extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar Origem" hasSearchBar />
        Explorar Comida Area
        <MenuFooter />
      </div>
    );
  }
}
