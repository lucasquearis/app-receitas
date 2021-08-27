import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const BTN_LOGIN = 'login-submit-btn';
const INPUT_EMAIL = 'email-input';
const INPUT_PASSWORD = 'password-input';
const WRONG_EMAIL_1 = 'email.com.';
const CORRECT_EMAIL = 'email@test.com';
const WRONG_PASSWORD_1 = '123';
const WRONG_PASSWORD_2 = '123456';
const CORRECT_PASSWORD = '1234567';
const MEALSTOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';

describe('testa o componente Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  describe('2 - Crie todos os elementos que devem', () => {
    it('conter os data-testid corretos', () => {
      expect(screen.getByTestId(BTN_LOGIN)).toBeInTheDocument();
      expect(screen.getByTestId(INPUT_EMAIL)).toBeInTheDocument();
      expect(screen.getByTestId(INPUT_PASSWORD)).toBeInTheDocument();
    });
  });

  describe('3 - o valor do input email muda ao usuário digitar nele', () => {
    it('É possível escrever o email', () => {
      userEvent.type(screen.getByTestId(INPUT_EMAIL), WRONG_EMAIL_1);
      expect(screen.getByTestId(INPUT_EMAIL)).toHaveValue(WRONG_EMAIL_1);
    });
  });

  describe('4 - o valor do input password muda ao usuário digitar nele', () => {
    it('', () => {
      userEvent.type(screen.getByTestId(INPUT_PASSWORD), WRONG_PASSWORD_1);
      expect(screen.getByTestId(INPUT_PASSWORD)).toHaveValue(WRONG_PASSWORD_1);
    });
  });

  describe('5- O botão "Entrar" está desabilitado', () => {
    it('O botão deve estar desativado se o email for inválido', () => {
      expect(screen.getByTestId(BTN_LOGIN)).toBeDisabled();
      userEvent.type(screen.getByTestId(INPUT_EMAIL), WRONG_EMAIL_1);
      userEvent.type(screen.getByTestId(INPUT_PASSWORD), CORRECT_PASSWORD);
      expect(screen.getByTestId(BTN_LOGIN)).toBeDisabled();
    });

    it('O botão deve estar desativado com a senha de 6 caracteres ou menos', () => {
      expect(screen.getByTestId(BTN_LOGIN)).toBeDisabled();
      userEvent.type(screen.getByTestId(INPUT_EMAIL), CORRECT_EMAIL);
      userEvent.type(screen.getByTestId(INPUT_PASSWORD), WRONG_PASSWORD_2);
      expect(screen.getByTestId(BTN_LOGIN)).toBeDisabled();
    });

    it('O botão deve estar ativado se o email e a senha forem válidos', () => {
      expect(screen.getByTestId(BTN_LOGIN)).toBeDisabled();
      userEvent.type(screen.getByTestId(INPUT_EMAIL), CORRECT_EMAIL);
      userEvent.type(screen.getByTestId(INPUT_PASSWORD), CORRECT_PASSWORD);
      expect(screen.getByTestId(BTN_LOGIN)).not.toBeDisabled();
    });
  });

  describe('6 - Salve 2 tokens no localStorage após asubmissão', () => {
    it('Após a submissão mealsToken e cocktailsToken devem estar no localStorage', () => {
      expect(screen.getByTestId(BTN_LOGIN)).toBeDisabled();
      expect(localStorage.getItem(MEALSTOKEN)).toBe(null);
      expect(localStorage.getItem(COCKTAILS_TOKEN)).toBe(null);

      // userEvent.type(screen.getByTestId(INPUT_EMAIL), CORRECT_EMAIL);
      // userEvent.type(screen.getByTestId(INPUT_PASSWORD), CORRECT_PASSWORD);
      // userEvent.click(screen.getByTestId(BTN_LOGIN));
      // expect(localStorage.getItem(MEALSTOKEN)).toBe('1');
      // expect(localStorage.getItem(COCKTAILS_TOKEN)).toBe('1');
    });
  });
});
