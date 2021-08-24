// acessar os elementos da tela

// interagir com esses elementos (se necessário)

// fazer os testes

import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/Login';

test('Verifica se há input do tipo email', () => {
  const { getByLabelText } = render(<Login />);

  const inputEmail = getByLabelText(/email/i);
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

test('Verifica se há input do tipo password', () => {
  const { getByLabelText } = render(<Login />);

  const inputPassword = getByLabelText(/senha/i);
  expect(inputPassword).toBeInTheDocument();
  expect(inputPassword.type).toBe('password');
});
