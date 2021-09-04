import React from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/Explore.css';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function Explore() {
  return (
    <>
      <HeaderNoSearch title="Explorar" />
      <div className="explore">
        <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
        <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
      </div>
      <BottomMenu />
    </>
  );
}
