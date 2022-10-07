import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Vectort from '../Assets/Vectort.png';
import logoTrybeWallet from '../Assets/logoTrybeWallet.png';
import Vectoru from '../Assets/Vectoru.png';

class Header extends Component {
  subtotal = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const moeda = curr.currency;
      if (moeda !== 'USDT') {
        const value = Number(curr.exchangeRates[moeda].ask) * Number(curr.value);
        return acc + Number(value);
      }
      return acc;
    }, 0);
    return Number(total).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="flex items-center self-center justify-evenly flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-blue mr-3">
          <img className="mr-2" src={ logoTrybeWallet } alt="trybe-wallet" />
        </div>
        <div className="mr-3 flex">
          <img className="mr-2" src={ Vectoru } alt="user" />
          <p data-testid="email-field" className="text-emerald-400 text-2xl">
            {`${email}`}
          </p>
        </div>
        <div className="mr-3 flex items-center">
          <img className="mr-2" src={ Vectort } alt="user" />
          <p data-testid="total-field" className="text-blue-700 mr-2">
            {`Despesa Total: ${this.subtotal()}`}
          </p>
          <p data-testid="header-currency-field" className="text-blue-700 mr-2">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
