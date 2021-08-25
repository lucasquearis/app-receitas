import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Main, Form, Input, Span, Button, Label, Gif, P } from './styles';
import regexEmail from '../../services';
import { RecipesContext } from '../../context/RecipesContext';

const passwordLength = 6;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginHandle, redirect } = useContext(RecipesContext);

  if (redirect) {
    return <Redirect to="/comidas" />;
  }
  return (
    <Main>
      <Form>
        <Gif src="/loginGif.gif" alt="gif" />
        <h1>Bem vindo!</h1>
        <P>Lets Cook ! Sign in.</P>
        <Label>
          <Input
            value={ email }
            data-testid="email-input"
            type="text"
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </Label>
        <Label>
          <Input
            value={ password }
            data-testid="password-input"
            type="password"
            placeholder="Password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Label>
        <Span>Esqueceu a senha ?</Span>
        <Button
          disabled={ !(regexEmail.test(email) && password.length > passwordLength) }
          onClick={ () => loginHandle(email) }
          data-testid="login-submit-btn"
          type="button"
        >
          Entrar
        </Button>
        <P style={ { fontSize: '13px' } }>
          Ainda não possui uma conta ?
          {' '}
          <Span>Sign in</Span>
          .
        </P>
      </Form>
    </Main>
  );
};

export default Login;
