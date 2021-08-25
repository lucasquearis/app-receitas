import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndStore } from './testConfig';

afterEach(() => jest.clearAllMocks());

const VALID_EMAIL = 'teste@email.com';
const VALID_PASSWORD = '1234567';

describe('2 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', () =>{
  beforeEach(() => {
    renderWithRouterAndStore(<App />, '/')
  })
  
  test('A rota para a página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndStore(<App />, '/');
    expect(history.location.pathname).toBe('/');
  })

  test('O input de email deve possuir o atributo data-testid="email-input"', () => {
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
  })

  test('O input de senha deve possuir o atributo data-testid="password-input"', () => {
    const senha = screen.getByTestId('password-input');
    expect(senha).toBeInTheDocument();
  })

  test('O botão de Entrar deve possuir o atributo data-testid="login-submit-btn"', () => {
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
  })
})

describe('3 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu email no input de email', () => {
  test('É possível escrever o email', () => {
    renderWithRouterAndStore(<App />, '/')
    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'teste@teste.com');
    expect(email).toHaveValue('teste@teste.com');
  })
})

describe('4 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever sua senha no input de senha', () => {
  test('É possível escrever a senha', () => {
    renderWithRouterAndStore(<App />, '/');
    const senha = screen.getByTestId('password-input');
    userEvent.type(senha, '7654321');
    expect(senha).toHaveValue('7654321');
  })
})

describe('5 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  beforeEach(() => {
    renderWithRouterAndStore(<App />, '/')
  })

  test('Verifica se o botão de Entrar está desabilitado quando um email inválido é digitado', () => {
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  userEvent.type(email, 'email');
  userEvent.type(senha, VALID_PASSWORD);
  expect(button).toBeDisabled();

  userEvent.type(email, 'email@com@');
  userEvent.type(senha, VALID_PASSWORD);
  expect(button).toBeDisabled();

  userEvent.type(email, 'emailcom@');
  userEvent.type(senha, VALID_PASSWORD);
  expect(button).toBeDisabled();

  userEvent.type(email, 'alguem@email.');
  userEvent.type(senha, VALID_PASSWORD);
  expect(button).toBeDisabled();
  })

  test('O botão de "Entrar está desabilitado quando uma senha inválida é digitada', () => {
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  userEvent.type(email, VALID_EMAIL);
  userEvent.type(senha, '23456');
  expect(button).toBeDisabled();
  });

  test('O botão de "Entrar" está habilitado quando um email e uma senha válidos são passados', () => {
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  expect(button).toHaveAttribute('disabled');
  userEvent.type(email, VALID_EMAIL);
  userEvent.type(senha, VALID_PASSWORD);
  expect(button).not.toHaveAttribute('disabled');
  });
});

describe('6 - Salve 2 tokens no localStorage após a submissão, identificados pelas chaves mealsToken e cocktailsToken', () => {
  test('Após a submissão mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBeDefined();
    expect(cocktailsToken).toBeDefined();
  })
})

describe('7 - Salve o e-mail da pessoa usuária no localStorage na chave user após a submissão', () => {
  test('Após a submissão, o e-mail de pessoa usuária deve ser salvo em localStorage na chave user no formato { email: email-da-pessoa }', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    const user = { email: 'teste@email.com' };

    const userlocal = JSON.parse(localStorage.getItem('user'));
    expect(userlocal).toEqual(user)
  })
})

describe('8 - Redirecione a pessoa usuária para a tela principal', () => {
  test('A rota muda para a tela principal de receitas de comidas', () => {
    const { history } = renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);
    
    expect(history.location.pathname).toBe('/comidas');
  })
})