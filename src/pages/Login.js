import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import RecipesContext from '../context/RecipesContext';
import DrinksAPI from '../service/drinksAPI';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { setEmail, drinkCategory } = useContext(RecipesContext);
  const { email, password } = user;

  DrinksAPI();
  console.log(drinkCategory);

  const handleOnChange = ({ target }) => {
    const { id, value } = target;
    setUser({
      ...user,
      [id]: value,
    });
  };
  const handleOnClick = () => {
    setEmail(email);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const SIX = 6;
  const validEmail = /\S+@\S+\.\w+/.test(email);
  const validPassword = password.length > SIX;
  const disabled = !(validEmail && validPassword);

  return (
    <main>
      <form>
        <Input
          label="Email:"
          type="text"
          value={ email }
          testId="email-input"
          id="email"
          onChange={ handleOnChange }
        />
        <Input
          label="Senha:"
          type="text"
          value={ password }
          testId="password-input"
          id="password"
          onChange={ handleOnChange }
        />
        <Link to="/comidas">
          <Button
            text="Entrar"
            onClick={ handleOnClick }
            testId="login-submit-btn"
            disabled={ disabled }
          />
        </Link>
      </form>
    </main>
  );
}

export default Login;
