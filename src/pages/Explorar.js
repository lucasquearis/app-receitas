import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './perfil.css';

export default function Explorar() {
  return (
    <div>
      <Header
        titulo="Explorar"
        enableSearchIcon={ false }
      />
      <div className="perfil-btn-container">
        <Link to="/explorar/comidas">
          <Button
            size="lg"
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="explorar/bebidas">
          <Button
            size="lg"
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
