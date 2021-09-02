import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import RecipesContext from '../context/RecipesContext';
import '../styles/Login.css';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { setEmail } = useContext(RecipesContext);
  const { email, password } = user;
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
    <main className="d-flex flex-column justify-content-center align-items-center">
      <h2>Login</h2>
      <form className="d-flex flex-column align-items-center login-form mt-4">
        <Input
          label="Email"
          type="text"
          value={ email }
          testId="email-input"
          id="email"
          onChange={ handleOnChange }
          className="border-top border-right border-left p-2"
        />
        <Input
          label="Senha"
          type="text"
          value={ password }
          testId="password-input"
          id="password"
          onChange={ handleOnChange }
          className="border-top border-right border-left p-2"
        />
        <Link to="/comidas">
          <Button
            text="Entrar"
            onClick={ handleOnClick }
            testId="login-submit-btn"
            disabled={ disabled }
            className="btn btn-outline-success mt-4"
          />
        </Link>
      </form>
    </main>
  );
}

export default Login;
