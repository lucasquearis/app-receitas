import React from 'react';
import BottomMenu from '../components/BottomMenu';
import './pageCSS/Explore.css';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function Explore() {
  return (
    <>
      <HeaderNoSearch title="Explorar" />
      <BottomMenu />
    </>
  );
}
