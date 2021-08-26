import React from 'react';
import './pageCSS/Explore.css';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function Explore() {
  return (
    <>
      <HeaderNoSearch title="Explorar" />
      <BottomMenu />
    </>
  );
}
