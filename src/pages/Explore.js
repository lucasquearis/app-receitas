import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <Link>
        <button data-testid="explore-food">
          Explorar Comidas
        </button>
      </Link>
      <Link>
        <button data-testid="explore-drinks">
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
