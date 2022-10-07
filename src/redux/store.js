// configure aqui sua store
import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as creatStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = creatStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

export default store;
