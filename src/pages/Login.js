/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { actionUserEmail, requestApi } from '../redux/actions/index';
import logoTrybeWallet from '../Assets/logoTrybeWallet.png';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    buttonDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { email, senha } = this.state;
      const magicNumber = 5;
      if (this.validateEmail(email) && senha.length > magicNumber) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  };

  validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  entryNext = () => {
    const { history, addEmail, request } = this.props;
    const { email } = this.state;
    addEmail(email);
    request();
    history.push('/carteira');
  };

  render() {
    const { email, senha, buttonDisabled } = this.state;
    return (
      <div
        className="
      flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={ logoTrybeWallet }
              alt="Your Company"
            />
            <h2
              className="
            mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
              Faça login em sua conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou
              {' '}
              <Link
                to="/not"
                className="
              font-medium eftext-indigo-600 hover:text-indigo-500"
              >
                comece seu teste gratuito de 14 dias
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only" />
                <input
                  type="text"
                  name="email"
                  className="
                    relative
                    block
                    w-full
                    appearance-none
                    rounded-none
                    rounded-t-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-gray-900
                    placeholder-gray-500
                    focus:z-10
                    focus:border-indigo-500
                    focus:outline-none
                    focus:ring-indigo-500
                    sm:text-sm"
                  placeholder="Endereço de email"
                  value={ email }
                  data-testid="email-input"
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                <label htmlFor="senha" className="sr-only" />
                <input
                  type="password"
                  name="senha"
                  value={ senha }
                  data-testid="password-input"
                  className="
                  relative
                  block w-full
                  appearance-none
                  rounded-none
                  rounded-b-md border
                  border-gray-300
                  px-3
                  py-2
                  text-gray-900
                  placeholder-gray-500
                  focus:z-10
                  focus:border-indigo-500
                  focus:outline-none
                  focus:ring-indigo-500
                  sm:text-sm"
                  placeholder="Senha"
                  onChange={ this.handleChange }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4
                  rounded
                  border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
                  />
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/not"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="button"
                disabled={ buttonDisabled }
                className="group
                relative
                flex
                w-full
                justify-center
                rounded-md
                border
                border-transparent
                bg-indigo-600
                py-2
                px-4
                text-sm
                font-medium
                text-white
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
                focus:ring-offset-2"
                onClick={ this.entryNext }
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (value) => dispatch(actionUserEmail(value)),
  request: () => dispatch(requestApi()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequiered;

export default connect(null, mapDispatchToProps)(Login);
