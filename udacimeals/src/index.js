import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import App from './components/App';
import reducer from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';
// const logger = store => next => action => {
//   console.group(action.type);
//   console.info('dispatching', action);
//   const result = next(action);
//   console.log('next state', store.getState());
//   console.groupEnd(action.type);
//   return result;
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
