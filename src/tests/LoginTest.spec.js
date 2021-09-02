import React from 'react';
import routes from '../routes';
import App from '../App';

const emailTest = 'email-input';
const passwordTest = 'password-input';
const loginBtnTest = 'login-submit-btn';

describe('testa se os elementos da página de Login são renderizados', () => {
  afterAll(() => done());

  it('testa se a rota está correta', () => {
    const { history } = routes(<App />);
    let { pathname } = history.location;
    pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  it('testa se o input de email é renderizado e funciona', () => {
    const { getByTestId } = renderWithRouterAndDataContext(<App />);
    const email = getByTestId(emailTest);
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'betrybe@trybe.com');
    expect(email).toHaveValue('betrybe@trybe.com');
  });

  it('testa se o input da senha é renderizado e funciona', () => {
    const { getByTestId } = renderWithRouterAndDataContext(<App />);
    const password = getByTestId(passwordTest);
    expect(password).toBeInTheDocument();
    userEvent.type(password, 'p4ssw0rd');
    expect(password).toHaveValue('p4ssw0rd');
  });

  it('testa se o botão de Login é renderizado e se está desabilitado', () => {
    const { getByTestId } = renderWithRouterAndDataContext(<App />);
    const buttonLogin = getByTestId(loginBtnTest);
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toHaveAttribute('disabled');
  });
});

describe('testa se o botão habilita/desabilita', () => {
  afterAll(() => done());

  it('testa se com o email errado e a senha correta,'
  + 'o botão permanece desabilitado', () => {
    const { getByTestId } = renderWithRouterAndDataContext(<App />);
    const email = getByTestId(emailTest);
    const password = getByTestId(passwordTest);
    const buttonLogin = getByTestId(loginBtnTest);
    userEvent.type(email, 'trybe@betrybecom');
    userEvent.type(password, '1234567');
    expect(buttonLogin).toBeDisabled();
  });

  it('testa se com o email correto e a senha errada,'
  + 'o botão permanece desabilitado', () => {
    const { getByTestId } = renderWithRouterAndDataContext(<App />);
    const email = getByTestId(emailTest);
    const password = getByTestId(passwordTest);
    const buttonLogin = getByTestId(loginBtnTest);
    userEvent.type(email, 'trybe@betrybe.com');
    userEvent.type(password, '123456');
    expect(buttonLogin).toBeDisabled();
  });

  it('testa se com o email e a senha corretas, o botão é habilitado', () => {
    const { getByTestId } = renderWithRouterAndDataContext(<App />);
    const emailInput = getByTestId(emailTest);
    const passwordInput = getByTestId(passwordTest);
    const loginButton = getByTestId(loginBtnTest);
    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeEnabled();
  });
});

describe('testa se quando o botão é clicado, redireciona para página de'
+ 'comidas e salva as informações no localStorage', () => {
  afterAll(() => done());

  it('testa se o botão de Login funciona quando clicado', () => {
    const { getByTestId, history } = renderWithRouterAndDataContext(<App />);
    let { pathname } = history.location;
    const email = getByTestId(emailTest);
    const password = getByTestId(passwordTest);
    const buttonLogin = getByTestId(loginBtnTest);
    localStorage.clear();
    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonLogin);
    expect(localStorage.getItem('user')).toBe('{"email":"trybe@trybe.com"}');
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    pathname = history.location.pathname;
    expect(pathname).toBe('/comidas');
    localStorage.clear();
  });
});
