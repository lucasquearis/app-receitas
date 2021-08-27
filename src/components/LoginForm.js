import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./LoginForm.css";
import foodInternet from "../images/foodInternet.jpg";

function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const history = useHistory();

  function handleClick() {
    localStorage.setItem("mealsToken", 1);
    localStorage.setItem("cocktailsToken", 1);
    localStorage.setItem("user", JSON.stringify({ email }));
    history.push("/comidas");
  }

  function isValid() {
    const passwordLength = 7;
    const validPassword = password.length >= passwordLength;
    const validEmail = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/i.test(
      email
    );
    return validEmail && validPassword;
  }

  return (
    <div className="forms-container">
      <div className="forms">
        <h2 className="name-food">Osteria Francescana</h2>
        <input
          className="input-container"
          data-testid="email-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <input
          className="input-password"
          data-testid="password-input"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />
        <Link to="/comidas">
          <button
            className="button-btn"
            data-testid="login-submit-btn"
            onClick={handleClick}
            type="button"
            disabled={!isValid()}
          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
