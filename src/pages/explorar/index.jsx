import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuFooter from '../../components/MenuFooter';
import './style/style.css';
import Header from '../../components/Header';

export default class Explorar extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar" showSearchBottom={ false } />
        <div className="container-button-explorar">

          <Link to="/explorar/comidas" data-testid="explore-food">
            <button
              className="btn btn-warning btnButon button-size"
              type="submit"

            >
              Explorar Comidas
            </button>
          </Link>
          <Link to="/explorar/bebidas" data-testid="explore-drinks">
            <button
              className="btn btn-warning btnButon button-size"
              type="submit"

            >
              Explorar Bebidas
            </button>
          </Link>
        </div>

        <MenuFooter />
      </div>
    );
  }
}
