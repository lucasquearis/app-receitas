import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEmail } from '../../Redux/actions/user';
import './Login.css';
import logo from './salad.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveStateEmailStore = this.saveStateEmailStore.bind(this);
    this.validation = this.validation.bind(this);

    this.state = {
      email: '',
      password: '',
      button: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.validation(); });
  }

  validation() {
    const { email, password } = this.state;
    const emailValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordValid = 7;
    if (emailValid.test(email) && passwordValid <= password.length) {
      this.setState({ button: false });
    }
    return true;
  }

  // Salva o email no Store que é chamada ao clicar no botão Entrar
  saveStateEmailStore() {
    const { email } = this.state;
    const userTokens = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(userTokens));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }

  submitLogin(event) {
    event.preventDefault();
    const { setEmailAction, history } = this.props;
    const { email } = this.state;
    setEmailAction(email);
    history.push('/comidas');
    this.saveStateEmailStore();
  }

  render() {
    const { email, password, button } = this.state;
    return (
      <div className="styleLogin">
        <img src={ logo } className="imageLogoIcon" alt="Logo" />
        <h2>Trybe Recipes</h2>
        <h4 className="textLogin">Login</h4>
        <form>
          <label htmlFor="input-email">
            <input
              className="imput"
              type="email"
              data-testid="email-input"
              name="email"
              id="input-email"
              value={ email }
              placeholder="Email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-password">
            <input
              className="imput"
              type="password"
              data-testid="password-input"
              name="password"
              id="input-password"
              value={ password }
              placeholder="Password"
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <button
          className="btn btn-warning btnButon"
          type="submit"
          data-testid="login-submit-btn"
          onClick={ (event) => this.submitLogin(event) }
          disabled={ button }
        >
          Entrar
        </button>
        <p className="group7">By Group 07</p>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({

  setEmailAction: (payload) => dispatch(actionEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setEmailAction: PropTypes.func,
}.isRequered;
