import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { saveLoginLocalStorage, validateLogin } from '../../utils';
import chef from '../../images/icons/chef.png';
import './style.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setDisabled(!validateLogin(email, password));
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveLoginLocalStorage(email);
    history.push('/comidas');
  };

  return (
    <div className="login-container">
      <Form
        className="login-form"
        onSubmit={ handleSubmit }
      >
        <h1>APP DE RECEITAS</h1>

        <img src={ chef } alt="Chef" />
        <h2>Login</h2>
        <Form.Group className="mb-3" controlId="loginFormEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            required
          />
          <Form.Text className="text-muted">
            Preencha com um email válido
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginFormPassword">
          <Form.Control
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            required
          />
          <Form.Text className="text-muted">
            Mais de 06 caracteres
          </Form.Text>
        </Form.Group>
        <Button
          type="submit"
          variant="success"
          data-testid="login-submit-btn"
          disabled={ disabled }
          size="lg"
        >
          Entrar
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
