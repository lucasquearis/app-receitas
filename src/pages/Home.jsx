import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import '../styles/Login.css';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(true);
  // localStorage.setItem('doneRecipes', []);

  useEffect(() => {
    const validEntries = () => {
      const minLength = 6;
      if (email.includes('@') && email.includes('.com') && password.length > minLength) {
        return setButton(false);
      }
      return setButton(true);
    };
    validEntries();
  }, [email, password, setButton]);

  const handleChange = async (handle, { target: { value } }) => {
    handle(value);
  };

  const setHistory = useHistory();
  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setHistory.push('/comidas');
  };

  return (
    <div className="divLogin">
      <h2 className="text-center">Login</h2>
      <div className="form-group align-self-center">
        <form className="form-group align-self-center">
          <label htmlFor="email-input">
            <input
              name="email"
              type="email"
              placeholder="Insira seu email"
              data-testid="email-input"
              className="form-control"
              onChange={ (event) => handleChange(setEmail, event) }
            />
          </label>
          <label htmlFor="password-input">
            <input
              name="password"
              type="password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              className="form-control"
              onChange={ (event) => handleChange(setPassword, event) }
            />
          </label>
          <div className="">
            <button
              type="button"
              data-testid="login-submit-btn"
              className="btn btn-primary btn-floating mx-1 center-block"
              disabled={ button }
              onClick={ handleClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
