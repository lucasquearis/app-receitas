import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { getFromLocalStorage } from '../../helpers';

import { Main, Form, Title, Button } from './style';

function Login() {
  const {
    setDoneRecipes,
    setFavoriteRecipes,
    setInProgressRecipes,
  } = useContext(AppContext);

  const [inputLogin, setInputLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { id, value } }) => {
    setInputLogin({
      ...inputLogin,
      [id]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: inputLogin.email }));
    setDoneRecipes(getFromLocalStorage('doneRecipes', []));
    setInProgressRecipes(getFromLocalStorage('inProgressRecipes', {
      cocktails: [],
      meals: [],
    }));
    setFavoriteRecipes(getFromLocalStorage('favoriteRecipes', []));
  };

  const verifyLogin = () => {
    const emailVerify = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const passwordVerify = 6;
    if (emailVerify.test(inputLogin.email)
    && passwordVerify < inputLogin.password.length) {
      return false;
    }
    return true;
  };

  return (
    <Main>
      <Title>Recipe App</Title>
      <Form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            id="email"
            type="text"
            placeholder="Email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            id="password"
            type="password"
            placeholder="Senha"
            onChange={ handleChange }
          />
        </label>
        <Link to="/comidas">
          <Button
            data-testid="login-submit-btn"
            type="button"
            onClick={ handleClick }
            disabled={ verifyLogin() }
          >
            Entrar
          </Button>
        </Link>
      </Form>
    </Main>
  );
}

export default Login;
