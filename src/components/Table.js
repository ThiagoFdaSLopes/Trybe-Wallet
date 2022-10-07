/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newExpenseRemove, editorTrue } from '../redux/actions/index';

class Table extends Component {
  retornarAsk = (ask) => Number(ask).toFixed(2);

  retornaConversão = (ask, value) => (Number(ask) * Number(value)).toFixed(2);

  removeId = (id) => {
    const { expenses, removeExpense } = this.props;
    const newExpenses = expenses.filter((element) => element.id !== id);
    removeExpense(newExpenses);
  };

  render() {
    const { expenses, editorOn } = this.props;
    return (
      <div className="container mx-auto px-3 sm:px-2 mt-7">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="inline-block min-w-full shadow rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Descrição</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Tag</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Método de pagamento</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Valor</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Moeda</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Câmbio utilizado</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Valor convertido</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Moeda de conversão</th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">Editar/Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((element) => (
                    <tr
                      key={ element.id }
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{element.description}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{element.tag}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{element.method}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{Number(element.value).toFixed(2)}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{element.exchangeRates[element.currency].name}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {this.retornarAsk(element.exchangeRates[element.currency].ask)}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {this
                          .retornaConversão(
                            element.exchangeRates[element.currency].ask,
                            element.value,
                          )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Real</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          type="button"
                          data-testid="edit-btn"
                          onClick={ () => editorOn(element.id) }
                          className="mr-8 ml-3"
                        >
                          <svg width="20" height="26" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7064 2.20989L13.1051 4.6086C13.2062 4.70965 13.2062 4.87453 13.1051 4.97558L7.29717 10.7835L4.82932 11.0574C4.49956 11.0947 4.22034 10.8154 4.25757 10.4857L4.53148 8.01784L10.3394 2.20989C10.4405 2.10884 10.6054 2.10884 10.7064 2.20989ZM15.0145 1.60091L13.7168 0.303162C13.3125 -0.101054 12.6557 -0.101054 12.2488 0.303162L11.3074 1.24456C11.2064 1.34561 11.2064 1.51049 11.3074 1.61155L13.7061 4.01025C13.8072 4.1113 13.9721 4.1113 14.0731 4.01025L15.0145 3.06885C15.4187 2.66198 15.4187 2.00513 15.0145 1.60091ZM10.2118 9.2039V11.9111H1.70196V3.40127H7.81307C7.89817 3.40127 7.97795 3.3667 8.03911 3.30819L9.10284 2.24446C9.30495 2.04236 9.16135 1.6993 8.8768 1.6993H1.27647C0.571753 1.6993 0 2.27106 0 2.97578V12.3366C0 13.0413 0.571753 13.613 1.27647 13.613H10.6373C11.342 13.613 11.9137 13.0413 11.9137 12.3366V8.14017C11.9137 7.85562 11.5707 7.71468 11.3686 7.91413L10.3049 8.97786C10.2463 9.03902 10.2118 9.1188 10.2118 9.2039Z" fill="#2FC18C" />
                          </svg>

                        </button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          onClick={ () => this.removeId(element.id) }
                          className="ml-3"
                        >
                          <svg width="20" height="26" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.847857 4.42105H9.15143L8.655 12.6184C8.60714 13.3958 7.98357 14 7.22857 14H2.77143C2.01643 14 1.39286 13.3958 1.345 12.6184L0.847857 4.42105ZM10 2.21053V3.68421H0V2.21053H2.14286V1.47368C2.14286 0.659474 2.78214 0 3.57143 0H6.42857C7.21786 0 7.85714 0.659474 7.85714 1.47368V2.21053H10ZM3.57143 2.21053H6.42857V1.47368H3.57143V2.21053Z" fill="#DF3C6D" />
                          </svg>

                        </button>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  id: wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (value) => dispatch(newExpenseRemove(value)),
  editorOn: (value) => dispatch(editorTrue(value)),
});

Table.propTypes = {
  expenses: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
