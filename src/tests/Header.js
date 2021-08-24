import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const BTN_LOGIN_ID = 'btn-login';
const BTN_SINGUP_ID = 'btn-singup';
const EMAIL_INPUT = 'email-input';
const PLACEHOLDER_EMAIL = 'Email';
const PASSWORD_INPUT = 'password-input';
const PLACEHOLDER_PASSWORD = 'Senha';
const EMAIL_TRY_1 = 'email.com.';
const EMAIL_TRY_2 = 'email@com';
const EMAIL_CORRECT = 'email@test.com';
const PASSWORD_TRY_1 = '123';
const PASSWORD_TRY_2 = '12345';
const PASSWORD_CORRECT = '123456';

describe('Verificar se a página Login', () => {
  const initialState = {
    register: [],
    login: {
      email: 'teste@gmail.com',
      password: '132456',
    },
  };

  const initialEntries = ['/login'];

  const config = {
    initialState,
    initialEntries,
  };

  describe.only('renderiza', () => {
    it('1- O texto "Olá! Digite o seu telefone"', () => {
      renderWithRouter(<App />, config);
      const message = screen.getByText(/Olá! Digite o seu telefone/i);
      console.log(message);
      expect().toBeInTheDocument();
    });

    it('2- O texto "Budega Virtual"', () => {
      renderWithRouter(<App />, config);
      // const linkToHome = screen.getByRole('link', { name: /budega virtual/i });
      const textToHome = screen.getByRole('heading', { level: 1 });
      expect(textToHome).toBeInTheDocument();
    });

    it('3- O texto "Contato"', () => {
      renderWithRouter(<App />, config);

      expect(screen.getByText(/Contato/i)).toBeInTheDocument();
    });

    it('4- O botão "Entrar" desabilitado', () => {
      renderWithRouter(<App />, config);

      expect(screen.getByTestId(BTN_LOGIN_ID)).toBeDisabled();
    });

    it('5- O botão "Criar Conta" e quando clicado redireciona para "/register"', () => {
      const { history } = renderWithRouter(<App />, config);

      userEvent.click(screen.getByTestId(BTN_SINGUP_ID));
      expect(history.location.pathname).toBe('/register');
      expect(screen.getByText(/Registrar/i)).toBeInTheDocument();
    });

    it('6- O contém input para email com o texto "Email"', () => {
      renderWithRouter(<App />, config);

      expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(PLACEHOLDER_EMAIL)).toBeInTheDocument();
    });

    it('7- O contém input para senha com o texto "Senha"', () => {
      renderWithRouter(<App />, config);

      expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(PLACEHOLDER_PASSWORD)).toBeInTheDocument();
    });
  });

  describe('ao preencher os inputs', () => {
    it('o valor do input email muda', () => {
      renderWithRouter(<App />, config);

      expect(screen.getByTestId(EMAIL_INPUT)).toHaveValue(EMAIL_TRY_1);
      userEvent.clear(screen.getByTestId(EMAIL_INPUT));
      userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL_TRY_2);
      expect(screen.getByTestId(EMAIL_INPUT)).toHaveValue(EMAIL_TRY_2);
    });

    it('o valor do input password muda', () => {
      renderWithRouter(<App />, config);

      userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD_TRY_1);
      expect(screen.getByTestId(PASSWORD_INPUT)).toHaveValue(PASSWORD_TRY_1);
      userEvent.clear(screen.getByTestId(PASSWORD_INPUT));
      userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD_TRY_2);
      expect(screen.getByTestId(PASSWORD_INPUT)).toHaveValue(PASSWORD_TRY_2);
    });

    it('email e senha corretos, o botão "Entrar" fica habilitado', () => {
      renderWithRouter(<App />, config);

      const buttonLogin = screen.getByTestId(BTN_LOGIN_ID);
      userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL_CORRECT);
      userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD_CORRECT);
      expect(buttonLogin).not.toBeDisabled();
    });
    it('quando clicar no botão "Entrar" é redirecionado para "/"', () => {
      const { history } = renderWithRouter(<App />, config);

      const buttonLogin = screen.getByTestId(BTN_LOGIN_ID);
      userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL_CORRECT);
      userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD_CORRECT);
      expect(buttonLogin).not.toBeDisabled();
      userEvent.click(buttonLogin);
      expect(history.location.pathname).toBe('/');
    });
  });
});
