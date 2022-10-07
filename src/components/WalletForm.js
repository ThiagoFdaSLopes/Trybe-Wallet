/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newExpensePr, saveExpenseEdit } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handlechange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  submit = () => {
    const { saveExpense } = this.props;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    const { id, value, description, currency, method, tag } = this.state;
    saveExpense({ id, value, description, currency, method, tag });
    this.resetState();
  };

  receiveExpenseEdit = () => {
    const { id, expenses, editExpense } = this.props;
    const objFind = expenses.find((element) => element.id === id);
    const objExpense = expenses.filter((element) => element.id !== id);
    const { exchangeRates } = objFind;
    const { value, description, currency, method, tag } = this.state;
    const objEdit = { id, value, description, currency, method, tag, exchangeRates };
    const newExpense = [...objExpense, objEdit].sort((a, b) => a.id - b.id);
    editExpense(newExpense);
    this.resetState();
  };

  resetState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <section className="mt-7">

        <div className="md:container md:mx-auto flex">
          <form className="flex justify-items-center">
            <label className="text-center" htmlFor="value">
              Despesa
              <input
                type="text"
                name="value"
                value={ value }
                className="w-64 mr-2"
                data-testid="value-input"
                onChange={ this.handlechange }
              />
            </label>
            <label className="text-center" htmlFor="description">
              Descrição
              <input
                type="text"
                name="description"
                value={ description }
                className="w-64 mr-2"
                data-testid="description-input"
                onChange={ this.handlechange }
              />
            </label>
            <label className="text-center" htmlFor="currency">
              Moeda
              <select
                aria-label="currency"
                name="currency"
                data-testid="currency-input"
                className="w-64 mr-2"
                value={ currency }
                onChange={ this.handlechange }
              >
                { currencies.map((element) => <option key={ element }>{element}</option>)}
              </select>
            </label>
            <label className="text-center" htmlFor="method">
              Pagamento
              <select
                aria-label="method"
                name="method"
                data-testid="method-input"
                className="w-64 mr-2"
                value={ method }
                onChange={ this.handlechange }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label className="text-center" htmlFor="tag">
              Categoria
              <select
                aria-label="tag"
                name="tag"
                className="w-64 mr-2"
                data-testid="tag-input"
                value={ tag }
                onChange={ this.handlechange }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </form>
        </div>
        <div className="md:container md:mx-auto flex mt-2 flex justify-center">
          {
            editor ? (
              <button
                type="button"
                onClick={ this.receiveExpenseEdit }
                className="
                bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar despesas

              </button>
            ) : (
              <button
                className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={ this.submit }
              >
                Adicionar despesa

              </button>
            )
          }
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (obj) => dispatch(newExpensePr(obj)),
  editExpense: (obj) => dispatch(saveExpenseEdit(obj)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
  id: wallet.idToEdit,
  expenses: wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

// <button type="button" onClick={ this.submit }>Adicionar despesa</button>
// <button type="button" onClick={ this.submit }>Editar despesas</button>
