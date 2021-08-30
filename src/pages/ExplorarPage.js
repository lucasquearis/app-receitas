import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Header, FooterMenu } from '../components';

export default function ExplorarPage() {
  const [redirect, setRedirect] = useState({ page: '', shouldRedirect: false });
  const { page, shouldRedirect } = redirect;

  const clickHandler = ({ target: { name } }) => {
    setRedirect({
      page: name,
      shouldRedirect: true,
    });
  };

  if (shouldRedirect) return <Redirect to={ `/explorar/${page}` } />;
  return (
    <div>
      <Header title="Explorar" showSearchIcon={ false } />
      <button
        name="comidas"
        type="button"
        onClick={ clickHandler }
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        name="bebidas"
        type="button"
        onClick={ clickHandler }
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
      <FooterMenu />
    </div>
  );
}
