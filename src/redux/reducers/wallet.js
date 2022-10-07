// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  NEW_EXPENSE_REMOVE,
  API_RESPONSE,
  SAVE_EXTENSE,
  EDITOR_TRUE,
  SAVE_EXPENSE_EDIT,
} from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_RESPONSE:
    return { ...state, currencies: action.payload };
  case SAVE_EXTENSE:
    return { ...state, expenses: [...state.expenses, action.payload], editor: false };
  case EDITOR_TRUE:
    return { ...state, editor: action.payload, idToEdit: action.id };
  case NEW_EXPENSE_REMOVE:
    return { ...state, expenses: action.expense };
  case SAVE_EXPENSE_EDIT:
    return { ...state, expenses: [...action.obj], editor: false };
  default:
    return state;
  }
};

export default wallet;
