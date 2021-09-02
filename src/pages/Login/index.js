import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { getFromLocalStorage } from '../../helpers';

function Login() {
  const {
    setCocktailsToken,
    setDoneRecipes,
    setFavoriteRecipes,
    setInProgressRecipes,
    setMealsToken,
    // setUser,
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
    setMealsToken(1);
    setCocktailsToken(1);
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
    <div>
      <div>
        <form>
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
            <button
              data-testid="login-submit-btn"
              type="button"
              onClick={ handleClick }
              disabled={ verifyLogin() }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
