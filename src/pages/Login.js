import React, { useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { setLocalStorage, getLocalStorage } from '../components/LocalStorage';
import { Redirect } from 'react-router-dom';

function Login() {
  const { setRegister } = useContext(RecipesContext);
  const MAX_LENGTH = 6;
  const [login, setLogin] = useState({
    email:'',
    password: '',
    button: false,
  });

  const handleChange = ({ target: { name, value } }) => {
    setLogin((initialState) => ({
      ...initialState,
      [name]: value,
    }));
  }


  const handleClick = () => {
    setRegister(login);
    setLocalStorage('user', { email: login.email } )
    console.log(getLocalStorage('user'))
    setLogin({
      email:'',
      password: '',
      button: true,
    })
  }

  const checkEmail = () => {
    const { email } = login;
    return /\S+@\S+\.\S+/.test(email);
  }

  const checkPassword = () => {
    const { password } = login;
    return password.length > MAX_LENGTH;
  }

  const checkLogin = () => {
    return checkEmail() && checkPassword();
  }

  const { email, password } = login;
  if(login.button) {
    return <Redirect to="/comidas" />
  }
  return (
    <section>
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            id="email"
            name="email"
            type="text"
            value={ email }
            onChange={ handleChange }
            />
        </label>
        <label htmlFor="password">
          Senha:
          <input
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
