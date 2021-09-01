import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { setLocalStorage } from '../components/LocalStorage';
import '../login.css';

function Login() {
  const { setRegister } = useContext(RecipesContext);
  const MAX_LENGTH = 6;
  const [login, setLogin] = useState({
    email: '',
    password: '',
    button: false,
  });

  const handleChange = ({ target: { name, value } }) => {
    setLogin((initialState) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setRegister(login);
    setLocalStorage('user', { email: login.email });
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLogin({
      email: '',
      password: '',
      button: true,
    });
  };

  const checkEmail = () => {
    const { email } = login;
    return /\S+@\S+\.\S+/.test(email);
  };

  const checkPassword = () => {
    const { password } = login;
    return password.length > MAX_LENGTH;
  };

  const checkLogin = () => checkEmail() && checkPassword();

  const { email, password } = login;
  if (login.button) {
    return <Redirect to="/comidas" />;
  }
  return (
    <section className="login-section">
      <form className="login-form">
        <label htmlFor="email" className="texto-email">
          Email:
          <input
            className="login-email"
            data-testid="email-input"
            id="email"
            name="email"
            type="text"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password" className="texto-senha">
          Senha:
          <input
            className="login-senha"
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ handleChange }
          />
        </label>
      </form>
      <button
        className={ !checkLogin() ? 'login-button' : 'login-button enable' }
        data-testid="login-submit-btn"
        type="button"
        onClick={ handleClick }
        disabled={ !checkLogin() }
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;
