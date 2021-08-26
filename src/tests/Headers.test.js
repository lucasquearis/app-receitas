import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import Login from '../pages/login/Login';
import Comidas from '../pages/comidas/Comidas';
import Bebidas from '../pages/bebidas/Bebidas';
import Perfil from '../pages/perfil/Perfil';

import { renderWithRouterAndStore } from './testConfig';

describe('não sei oque escrever pq o header da trybe ta esquisito', () => {
  test(' Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    renderWithRouterAndStore(<Comidas />, '/comidas');
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(searchBar).not.toBeInTheDocument();

    const titleHead = screen.getByTestId('page-title');
    expect(titleHead).toBeInTheDocument();
    expect(titleHead).toHaveTextContent('Comidas');

    const ProfilePicture = screen.getByTestId('profile-top-btn');
    expect(ProfilePicture).toBeInTheDocument();
    fireEvent.click(ProfilePicture);
    expect(titleHead).toHaveTextContent('Perfil');
  });
});
