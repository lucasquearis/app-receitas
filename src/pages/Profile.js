import React from 'react';
import './pageCSS/Profile.css';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function Profile() {
  return (
    <>
      <HeaderNoSearch title="Perfil" />
      <BottomMenu />
    </>
  );
}
