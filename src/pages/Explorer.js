import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import './css/Explorer.css';
import Footer from '../components/Footer';

const Explorer = () => (
  <div>
    <Header title="Explorar" />
    <div className="button-container">
      <Button
        className="explore-food explore-btn"
        buttonText="Explorar Comidas"
        type="button"
        isDisable={ false }
        pathname="/explorar/comidas"
      />
      <Button
        className="explore-drinks explore-btn"
        buttonText="Explorar Bebidas"
        type="button"
        isDisable={ false }
        pathname="/explorar/bebidas"
      />
    </div>
    <Footer />
  </div>
);

export default Explorer;
