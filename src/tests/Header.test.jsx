import React from 'react';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

const testIds = {
  pageTitle: 'page-title',
  searchTopBtn: 'search-top-btn',
  profileTopBtn: 'profile-top-btn',
};

describe('Header', () => {
  test('Existe um botão de perfil', () => {
    const { getByTestId } = renderWithRouter(<Header title="Header" />);
    expect(getByTestId(testIds.profileTopBtn)).toBeInTheDocument();
  });

  test('Existe um título na página', () => {
    const { getByTestId } = renderWithRouter(<Header title="Header" />);
    expect(getByTestId(testIds.pageTitle)).toBeInTheDocument();
  });

  test('Existe um botão de busca', () => {
    const { getByTestId } = renderWithRouter(<Header
      title="Header"
      renderSearchIcon
    />);
    expect(getByTestId(testIds.searchTopBtn)).toBeInTheDocument();
  });
});
