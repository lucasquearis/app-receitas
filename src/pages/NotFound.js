import React from 'react';
import BottomMenu from '../components/BottomMenu';
import HeaderNoSearch from '../components/HeaderNoSearch';

export default function NotFound() {
  return (
    <>
      <HeaderNoSearch title="Perfil" />
      <div className="not-found__loading-text">
        <h2>Not Found</h2>
      </div>
      <BottomMenu />
    </>
  );
}
