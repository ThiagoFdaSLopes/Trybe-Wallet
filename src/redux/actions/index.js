// Coloque aqui suas actions
export const SET_USER = 'SET_USER';
export const EDITOR_TRUE = 'EDITOR_TRUE';
export const API_RESPONSE = 'API_RESPONSE';
export const SAVE_EXTENSE = 'SAVE_EXTENSE';
export const NEW_EXPENSE_REMOVE = 'NEW_EXPENSE_REMOVE';
export const SAVE_EXPENSE_EDIT = 'SAVE_EXPENSE_EDIT';

export const actionUserEmail = (email) => ({ type: SET_USER, email });

export const apiReturn = (obj) => ({ type: API_RESPONSE,
  payload: Object.keys(obj).filter((e) => e !== 'USDT') });

export const newExpenseRemove = (expense) => ({ type: NEW_EXPENSE_REMOVE, expense });

export const editorTrue = (id) => ({ type: EDITOR_TRUE, payload: true, id });

export const saveExpenseEdit = (obj) => ({ type: SAVE_EXPENSE_EDIT, obj });

export const newExpense = (exchange, obj) => ({
  type: SAVE_EXTENSE,
  payload: {
    ...obj,
    exchangeRates: exchange,
  } });

export const requestApi = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(apiReturn(data));
};

export const newExpensePr = (obj) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(newExpense(data, obj));
};
