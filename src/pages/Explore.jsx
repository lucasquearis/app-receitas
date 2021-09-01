import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

function Explore() {
  return (
    <div>
      <Header name="Explorar" />
      <div className="explore-btn-container">
        <Link to="/explorar/comidas">
          <Button
            data-testid="explore-food"
            variant="contained"
            color="secondary"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button 
            data-testid="explore-drinks"
            variant="contained"
            color="secondary"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
