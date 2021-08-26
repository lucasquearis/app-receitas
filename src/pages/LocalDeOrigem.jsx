import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';

function LocalDeOrigem() {
  return (
    <div>
      <Header titulo="Explorar Origem" />
      <main className="origem">
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            Default Dropdown
          </Dropdown.Toggle>
          <Dropdown.Menu data-testid="explore-by-area-dropdown">
            <Dropdown.Item data-testid="${area}-option" href="#">Menu Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </main>
      <Footer />
    </div>
  );
}

export default LocalDeOrigem;
